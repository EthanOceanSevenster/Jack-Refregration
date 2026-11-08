"""Settings for Jack Refrigerator Service.

Deliberately small. This backend does one job: take a callout request, store
it, and try to tell Jack about it. Anything it does not need is left out.

Environment variables are read from backend/.env (see .env.example).
"""

import os
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def env_bool(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def env_list(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


DEBUG = env_bool("DJANGO_DEBUG", True)

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured(
            "DJANGO_SECRET_KEY must be set when DEBUG is off. Generate one with: "
            'python -c "from django.core.management.utils import get_random_secret_key; '
            'print(get_random_secret_key())"'
        )
    SECRET_KEY = "django-insecure-dev-only-not-used-in-production"

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")

# Behind Caddy in production, which terminates TLS and forwards this header.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = env_list("CSRF_TRUSTED_ORIGINS")

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "3600"))

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "callouts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LANGUAGE_CODE = "en-za"
TIME_ZONE = os.getenv("DJANGO_TIME_ZONE", "Africa/Johannesburg")
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"
    },
}

REST_FRAMEWORK = {
    # Nothing here is read by a signed-in user, so there is no global
    # authentication. The one write endpoint is public and rate limited.
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.AnonRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {
        # Generous for a real customer, tight enough that nobody fills the
        # database overnight.
        "callout": os.getenv("API_CALLOUT_THROTTLE", "200/hour" if DEBUG else "15/hour"),
    },
}

# ---------------------------------------------------------------------------
# Who gets told about a callout
# ---------------------------------------------------------------------------
BUSINESS_NAME = os.getenv("BUSINESS_NAME", "Jack Refrigerator Service")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "")

_from = os.getenv("DEFAULT_FROM_EMAIL") or "no-reply@localhost"
DEFAULT_FROM_EMAIL = _from if "<" in _from else f"{BUSINESS_NAME} <{_from}>"

MAIL_TIMEOUT_SECONDS = int(os.getenv("MAIL_TIMEOUT_SECONDS", "10"))
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")

if RESEND_API_KEY:
    MAILERS = {"default": {"BACKEND": "callouts.mail.ResendBackend"}}
else:
    # Printed to the console in development. A missing mail setup must never
    # stop a callout being recorded.
    MAILERS = {"default": {"BACKEND": "django.core.mail.backends.console.EmailBackend"}}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "loggers": {"callouts": {"handlers": ["console"], "level": "INFO", "propagate": False}},
}
