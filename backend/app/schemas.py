"""Pydantic schemas for request/response validation."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


# --- Contact ---
class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=5, max_length=5000)

    @field_validator("name", "subject", "message")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field must not be blank")
        return v.strip()


class ContactResponse(BaseModel):
    id: int
    message: str = "Message received successfully."


class ContactMessageRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    is_read: bool


# --- Projects ---
class ProjectBase(BaseModel):
    slug: str = Field(min_length=1, max_length=80)
    title: str = Field(min_length=1, max_length=120)
    description: str
    tags: list[str] = []
    image: str = ""
    demo_url: str | None = None
    repo_url: str | None = None
    featured: bool = False
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(BaseModel):
    """Matches the frontend `Project` shape (id is the slug)."""

    id: str
    title: str
    description: str
    tags: list[str]
    image: str
    demoUrl: str | None = None
    repoUrl: str | None = None
    featured: bool = False
