"""Telling Jack about a callout, without making the customer wait.

Sending happens off the request. The callout is already stored by the time
this runs, so the person with the broken fridge gets their confirmation
whether or not a mail server is reachable.
"""

import logging
import threading

from django.conf import settings
from django.core.mail import EmailMessage, get_connection
from django.core.mail.backends.locmem import EmailBackend as LocmemBackend
from django.db import close_old_connections

logger = logging.getLogger(__name__)


def _send(subject: str, body: str, recipient: str, reply_to: list[str]) -> None:
    try:
        sent = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient],
            reply_to=reply_to or None,
        ).send()
    except Exception:  # noqa: BLE001 - a mail failure is not the customer's problem
        logger.exception("Could not email the callout: %s", subject)
        return
    finally:
        # Our own thread gets its own database connections, and Django only
        # tidies those per request.
        close_old_connections()

    if sent:
        logger.info("Callout emailed to %s: %s", recipient, subject)
    else:
        logger.warning("Mail backend accepted nothing for: %s", subject)


def _sends_instantly() -> bool:
    """True when sending cannot block, so there is nothing to move off-thread."""
    try:
        return isinstance(get_connection(), LocmemBackend)
    except Exception:  # noqa: BLE001
        return False


def notify_callout(callout) -> None:
    recipient = getattr(settings, "NOTIFY_EMAIL", "")
    if not recipient:
        logger.warning(
            "NOTIFY_EMAIL is empty, so callout %s was stored but nobody was told.",
            callout.pk,
        )
        return

    urgency = "URGENT, not cooling. " if callout.is_urgent else ""
    subject = f"{urgency}Callout: {callout.name}, {callout.get_appliance_display()}"
    body = "\n".join(
        [
            f"Name    : {callout.name}",
            f"Phone   : {callout.phone}",
            f"Area    : {callout.suburb or '-'}",
            f"Unit    : {callout.get_appliance_display()}",
            f"Urgent  : {'yes, not cooling at all' if callout.is_urgent else 'no'}",
            "",
            callout.problem or "(no description given)",
            "",
            "Sent from the website.",
        ]
    )

    args = (subject, body, recipient, [])
    if _sends_instantly():
        _send(*args)
        return
    threading.Thread(target=_send, args=args, name="notify-callout", daemon=True).start()
