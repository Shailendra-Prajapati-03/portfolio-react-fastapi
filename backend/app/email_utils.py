"""SMTP email helper.

Returns a structured result so callers can surface failures instead of
silently succeeding. Supports both STARTTLS (587) and implicit SSL (465).
"""

import logging
import smtplib
import ssl
from dataclasses import dataclass
from email.message import EmailMessage

from .config import settings

logger = logging.getLogger("portfolio.email")


@dataclass
class EmailResult:
    """Outcome of an email send attempt."""

    sent: bool
    skipped: bool = False
    error: str | None = None


def send_contact_notification(
    name: str, email: str, subject: str, body: str
) -> EmailResult:
    """Send a notification email about a new contact message."""
    if not settings.email_enabled:
        missing = ", ".join(settings.missing_email_vars) or "SMTP settings"
        logger.warning(
            "Email DISABLED — not configured (missing: %s). "
            "Message from %s was saved to the DB but NOT emailed.",
            missing,
            email,
        )
        return EmailResult(
            sent=False,
            skipped=True,
            error=f"Email is not configured on the server (missing: {missing}).",
        )

    mail_from = settings.mail_from
    mail_to = settings.contact_receiver

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {subject}"
    msg["From"] = mail_from
    msg["To"] = mail_to
    msg["Reply-To"] = email
    msg.set_content(
        f"New contact message\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{body}\n"
    )

    use_ssl = settings.smtp_use_ssl or settings.smtp_port == 465
    logger.info(
        "Sending contact email via %s:%s (%s) as %s -> %s",
        settings.smtp_host,
        settings.smtp_port,
        "SSL" if use_ssl else "STARTTLS",
        settings.smtp_user,
        mail_to,
    )

    try:
        context = ssl.create_default_context()
        if use_ssl:
            with smtplib.SMTP_SSL(
                settings.smtp_host, settings.smtp_port, timeout=15, context=context
            ) as server:
                server.login(settings.smtp_user, settings.smtp_password_clean)
                server.send_message(msg)
        else:
            with smtplib.SMTP(
                settings.smtp_host, settings.smtp_port, timeout=15
            ) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(settings.smtp_user, settings.smtp_password_clean)
                server.send_message(msg)
        logger.info("Contact notification sent successfully for %s", email)
        return EmailResult(sent=True)

    except smtplib.SMTPAuthenticationError as exc:
        logger.exception("SMTP authentication failed")
        return EmailResult(
            sent=False,
            error=(
                f"SMTP authentication failed (code {exc.smtp_code}). "
                "Check SMTP_USER and that SMTP_PASSWORD is a valid Gmail "
                "App Password (16 chars, no spaces) with 2-Step Verification on."
            ),
        )
    except (smtplib.SMTPException, OSError) as exc:
        # OSError covers timeouts / blocked ports / DNS on the host.
        logger.exception("Failed to send contact notification")
        return EmailResult(sent=False, error=f"{type(exc).__name__}: {exc}")
