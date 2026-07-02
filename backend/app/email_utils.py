"""Email helper with two transports.

- Resend (HTTP API over port 443) — preferred, works on hosts that block
  outbound SMTP (e.g. Render's free tier → "Network is unreachable").
- SMTP (STARTTLS 587 / SSL 465) — used for local dev or SMTP-friendly hosts.

Returns a structured result so callers surface failures instead of silently
succeeding.
"""

import json
import logging
import smtplib
import ssl
import urllib.error
import urllib.request
from dataclasses import dataclass
from email.message import EmailMessage

from .config import settings

logger = logging.getLogger("portfolio.email")

RESEND_ENDPOINT = "https://api.resend.com/emails"


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
    provider = settings.email_provider
    if provider is None:
        missing = "; ".join(settings.missing_email_vars)
        logger.warning(
            "Email DISABLED — no transport configured. Message from %s saved to "
            "the DB but NOT emailed. Configure: %s",
            email,
            missing,
        )
        return EmailResult(
            sent=False,
            skipped=True,
            error=f"Email is not configured on the server. Configure: {missing}",
        )

    full_subject = f"[Portfolio] {subject}"
    text = (
        f"New contact message\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{body}\n"
    )

    if provider == "resend":
        return _send_via_resend(full_subject, text, reply_to=email, sender_email=email)
    return _send_via_smtp(full_subject, text, reply_to=email, sender_email=email)


def _send_via_resend(
    subject: str, text: str, reply_to: str, sender_email: str
) -> EmailResult:
    """POST the message to Resend's HTTP API (works over HTTPS/443)."""
    to = settings.contact_receiver
    payload = json.dumps(
        {
            "from": settings.resend_from,
            "to": [to],
            "subject": subject,
            "text": text,
            "reply_to": reply_to,
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        RESEND_ENDPOINT,
        data=payload,
        method="POST",
        headers={
            "Authorization": f"Bearer {settings.resend_api_key}",
            "Content-Type": "application/json",
        },
    )
    logger.info("Sending contact email via Resend -> %s (reply-to %s)", to, sender_email)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8") or "{}")
        logger.info("Resend accepted the email (id=%s)", data.get("id"))
        return EmailResult(sent=True)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        logger.error("Resend API error %s: %s", exc.code, detail)
        return EmailResult(
            sent=False,
            error=(
                f"Resend API error {exc.code}: {detail}. Check RESEND_API_KEY, "
                "and that CONTACT_RECEIVER is verified (or is your Resend "
                "account email) if you haven't verified a domain."
            ),
        )
    except (urllib.error.URLError, OSError) as exc:
        logger.exception("Failed to reach Resend")
        return EmailResult(sent=False, error=f"Could not reach Resend: {exc}")


def _send_via_smtp(
    subject: str, text: str, reply_to: str, sender_email: str
) -> EmailResult:
    """Send over SMTP with STARTTLS (587) or implicit SSL (465)."""
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.mail_from
    msg["To"] = settings.contact_receiver
    msg["Reply-To"] = reply_to
    msg.set_content(text)

    use_ssl = settings.smtp_use_ssl or settings.smtp_port == 465
    logger.info(
        "Sending contact email via SMTP %s:%s (%s) as %s -> %s",
        settings.smtp_host,
        settings.smtp_port,
        "SSL" if use_ssl else "STARTTLS",
        settings.smtp_user,
        settings.contact_receiver,
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
        logger.info("Contact notification sent successfully (SMTP)")
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
        # OSError [Errno 101] Network is unreachable => the host blocks outbound
        # SMTP (common on Render's free tier). Switch to Resend (RESEND_API_KEY).
        logger.exception("Failed to send contact notification over SMTP")
        hint = ""
        if isinstance(exc, OSError):
            hint = (
                " — the host appears to block outbound SMTP. Use Resend instead "
                "by setting RESEND_API_KEY (HTTPS, not blocked)."
            )
        return EmailResult(sent=False, error=f"{type(exc).__name__}: {exc}{hint}")
