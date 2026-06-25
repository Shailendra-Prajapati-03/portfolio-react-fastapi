"""Database engine and session management using SQLModel."""

from collections.abc import Generator

from sqlmodel import Session, SQLModel, create_engine

from .config import settings

# check_same_thread is only needed for SQLite + multithreaded servers.
connect_args = (
    {"check_same_thread": False}
    if settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(
    settings.database_url,
    echo=settings.environment == "development",
    connect_args=connect_args,
)


def init_db() -> None:
    """Create all tables. Import models so they register on SQLModel.metadata."""
    from . import models  # noqa: F401

    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session."""
    with Session(engine) as session:
        yield session
