"""Sending over HTTPS instead of SMTP.

Cheap hosts block the SMTP ports, so an HTTPS mail API is the only route that
works on a small server. Set RESEND_API_KEY and this becomes the backend.
"""

import logging

import requests
from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend

logger = logging.getLogger(__name__)

API_URL = "https://api.resend.com/emails"


class ResendBackend(BaseEmailBackend):
    def __init__(self, fail_silently: bool = False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self.api_key = getattr(settings, "RESEND_API_KEY", "")
        self.timeout = int(getattr(settings, "MAIL_TIMEOUT_SECONDS", 10))

    def send_messages(self, email_messages) -> int:
        if not email_messages or not self.api_key:
            return 0
        sent = 0
        for message in email_messages:
            payload = {
                "from": message.from_email,
                "to": list(message.to),
                "subject": message.subject,
                "text": message.body,
            }
            if message.reply_to:
                payload["reply_to"] = list(message.reply_to)
            try:
                response = requests.post(
                    API_URL,
                    json=payload,
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    timeout=self.timeout,
                )
            except requests.RequestException:
                logger.exception("Could not reach Resend for: %s", message.subject)
                if not self.fail_silently:
                    raise
                continue
            if response.status_code >= 400:
                logger.error("Resend refused %s: %s", message.subject, response.text[:300])
                if not self.fail_silently:
                    response.raise_for_status()
                continue
            sent += 1
        return sent
