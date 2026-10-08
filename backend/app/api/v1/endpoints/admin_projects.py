import re
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.repositories.project_repo import ProjectRepository
from app.schemas.project import ProjectCreate, ProjectOut, ProjectUpdate

router = APIRouter()


def slugify(title: str) -> str:
    cleaned = re.sub(r"[^\w\s-]", "", title.lower().strip())
    return re.sub(r"[-\s]+", "-", cleaned)


@router.get("/admin/projects", response_model=List[ProjectOut], summary="List all projects for admin")
async def list_admin_projects(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all projects including unpublished drafts."""
    projects = await ProjectRepository.get_all(db, published_only=False)
    return [ProjectOut.model_validate(p) for p in projects]


@router.post("/admin/projects", response_model=ProjectOut, status_code=status.HTTP_201_CREATED, summary="Create project")
async def create_project(
    payload: ProjectCreate,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new portfolio project."""
    slug = payload.slug.strip() if payload.slug else slugify(payload.title)

    # Check slug uniqueness
    existing = await ProjectRepository.get_by_slug(db, slug)
    if existing:
        slug = f"{slug}-{int(len(slug))}"

    project = Project(
        title=payload.title.strip(),
        slug=slug,
        description=payload.description.strip(),
        category=payload.category.strip(),
        thumbnail=payload.thumbnail,
        images=payload.images,
        technologies=payload.technologies,
        client_name=payload.client_name,
        project_url=payload.project_url,
        featured=payload.featured,
        published=payload.published,
    )

    created = await ProjectRepository.create(db, project)
    return ProjectOut.model_validate(created)


@router.patch("/admin/projects/{id}", response_model=ProjectOut, summary="Update project")
async def update_project(
    id: str,
    payload: ProjectUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Update project fields, publication state, or featured status."""
    project = await ProjectRepository.get_by_id(db, id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    update_dict = payload.model_dump(exclude_unset=True)
    if "title" in update_dict and "slug" not in update_dict and not project.slug:
        update_dict["slug"] = slugify(update_dict["title"])

    updated = await ProjectRepository.update(db, project, update_dict)
    return ProjectOut.model_validate(updated)


@router.delete("/admin/projects/{id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete project")
async def delete_project(
    id: str,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a project."""
    project = await ProjectRepository.get_by_id(db, id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    await ProjectRepository.delete(db, project)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
