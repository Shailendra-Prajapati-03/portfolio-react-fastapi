"""Lightweight SMTP email helper.

If SMTP is not configured, sending is skipped silently (the message is still
persisted to the database). This keeps local development frictionless.
"""

import logging
import smtplib
from email.message import EmailMessage

from .config import settings

logger = logging.getLogger("portfolio.email")


def send_contact_notification(name: str, email: str, subject: str, body: str) -> bool:
    """Send a notification email about a new contact message.

    Returns True if an email was dispatched, False if skipped/failed.
    """
    if not settings.email_enabled:
        logger.info("SMTP disabled — skipping email for message from %s", email)
        return False

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {subject}"
    msg["From"] = settings.smtp_from
    msg["To"] = settings.contact_receiver
    msg["Reply-To"] = email
    msg.set_content(
        f"New contact message\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{body}\n"
    )

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
        logger.info("Contact notification sent for %s", email)
        return True
    except Exception:  # noqa: BLE001 - never break the request over email
        logger.exception("Failed to send contact notification")
        return False
