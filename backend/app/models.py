"""Database models."""

from datetime import datetime, timezone

from sqlmodel import Field, SQLModel


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class ContactMessage(SQLModel, table=True):
    """A message submitted through the contact form."""

    __tablename__ = "contact_messages"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=120)
    email: str = Field(index=True, max_length=255)
    subject: str = Field(max_length=200)
    message: str
    created_at: datetime = Field(default_factory=_utcnow, index=True)
    is_read: bool = Field(default=False)


class Project(SQLModel, table=True):
    """A portfolio project shown in the Projects section."""

    __tablename__ = "projects"

    id: int | None = Field(default=None, primary_key=True)
    slug: str = Field(index=True, unique=True, max_length=80)
    title: str = Field(max_length=120)
    description: str
    # tags stored as a comma-separated string for SQLite simplicity
    tags: str = Field(default="")
    image: str = Field(default="")
    demo_url: str | None = Field(default=None)
    repo_url: str | None = Field(default=None)
    featured: bool = Field(default=False)
    sort_order: int = Field(default=0, index=True)
    created_at: datetime = Field(default_factory=_utcnow)
