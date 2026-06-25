"""Project showcase endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import Project
from ..schemas import ProjectCreate, ProjectRead

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _to_read(p: Project) -> ProjectRead:
    """Map the DB model to the frontend-friendly shape."""
    return ProjectRead(
        id=p.slug,
        title=p.title,
        description=p.description,
        tags=[t for t in p.tags.split(",") if t],
        image=p.image,
        demoUrl=p.demo_url,
        repoUrl=p.repo_url,
        featured=p.featured,
    )


@router.get("", response_model=list[ProjectRead])
def list_projects(session: Session = Depends(get_session)) -> list[ProjectRead]:
    statement = select(Project).order_by(
        Project.sort_order,  # type: ignore[arg-type]
        Project.id,  # type: ignore[arg-type]
    )
    return [_to_read(p) for p in session.exec(statement).all()]


@router.get("/{slug}", response_model=ProjectRead)
def get_project(slug: str, session: Session = Depends(get_session)) -> ProjectRead:
    project = session.exec(select(Project).where(Project.slug == slug)).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return _to_read(project)


@router.post("", response_model=ProjectRead, status_code=201)
def create_project(
    payload: ProjectCreate,
    session: Session = Depends(get_session),
) -> ProjectRead:
    """Create a project (intended for an authenticated admin in production)."""
    exists = session.exec(select(Project).where(Project.slug == payload.slug)).first()
    if exists:
        raise HTTPException(status_code=409, detail="Slug already exists")

    project = Project(
        slug=payload.slug,
        title=payload.title,
        description=payload.description,
        tags=",".join(payload.tags),
        image=payload.image,
        demo_url=payload.demo_url,
        repo_url=payload.repo_url,
        featured=payload.featured,
        sort_order=payload.sort_order,
    )
    session.add(project)
    session.commit()
    session.refresh(project)
    return _to_read(project)
