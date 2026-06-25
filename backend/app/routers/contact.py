"""Contact form endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select

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
    """Persist a contact message and (optionally) email a notification."""
    record = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    session.add(record)
    session.commit()
    session.refresh(record)

    # Fire notification (no-op if SMTP not configured); never blocks success.
    send_contact_notification(
        payload.name, payload.email, payload.subject, payload.message
    )

    assert record.id is not None
    return ContactResponse(id=record.id)


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
