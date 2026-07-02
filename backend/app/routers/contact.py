"""Contact form endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from ..config import settings
from ..database import get_session
from ..email_utils import send_contact_notification
from ..models import ContactMessage
from ..schemas import ContactCreate, ContactMessageRead, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=201)
def create_message(
    payload: ContactCreate,
    session: Session = Depends(get_session),
) -> ContactResponse:
    """Persist a contact message and email a notification.

    The message is always saved first, so nothing is lost. If email sending
    fails (or is unconfigured in production), we surface the real error via a
    502 instead of silently returning success.
    """
    record = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    session.add(record)
    session.commit()
    session.refresh(record)
    assert record.id is not None

    result = send_contact_notification(
        payload.name, payload.email, payload.subject, payload.message
    )

    if not result.sent:
        # Dev convenience: if SMTP simply isn't configured locally, don't block
        # the form — report status but return success. Everywhere else, a
        # non-delivered message is a real failure the caller should see.
        if result.skipped and not settings.email_required:
            return ContactResponse(
                id=record.id,
                email_sent=False,
                message="Message received (email notifications are not configured).",
            )
        raise HTTPException(
            status_code=502,
            detail=result.error or "Failed to send the email notification.",
        )

    return ContactResponse(id=record.id, email_sent=True)


@router.get("", response_model=list[ContactMessageRead])
def list_messages(
    limit: int = Query(default=50, le=200),
    session: Session = Depends(get_session),
) -> list[ContactMessage]:
    """Admin view of received messages (protect this in production!)."""
    statement = (
        select(ContactMessage)
        .order_by(ContactMessage.created_at.desc())  # type: ignore[attr-defined]
        .limit(limit)
    )
    return list(session.exec(statement).all())
