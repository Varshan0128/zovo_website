from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repositories.project_repo import ProjectRepository
from app.schemas.project import ProjectOut

router = APIRouter()


@router.get("/projects", response_model=List[ProjectOut], summary="List published projects")
async def list_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all published portfolio projects."""
    projects = await ProjectRepository.get_all(
        db,
        category=category,
        featured=featured,
        published_only=True,
    )
    return projects


@router.get("/projects/{slug}", response_model=ProjectOut, summary="Get project by slug")
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    """Retrieve project details by unique slug."""
    project = await ProjectRepository.get_by_slug(db, slug)
    if not project or not project.published:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with slug '{slug}' not found",
        )
    return project
