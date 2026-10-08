from typing import Optional, List, Dict
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project


class ProjectRepository:
    @staticmethod
    async def get_all(
        db: AsyncSession,
        category: Optional[str] = None,
        featured: Optional[bool] = None,
        published_only: bool = True,
    ) -> List[Project]:
        query = select(Project)
        if published_only:
            query = query.where(Project.published == True)
        if category:
            query = query.where(Project.category.ilike(f"%{category.strip()}%"))
        if featured is not None:
            query = query.where(Project.featured == featured)

        query = query.order_by(desc(Project.created_at))
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_by_id(db: AsyncSession, project_id: str) -> Optional[Project]:
        result = await db.execute(select(Project).where(Project.id == project_id))
        return result.scalars().first()

    @staticmethod
    async def get_by_slug(db: AsyncSession, slug: str) -> Optional[Project]:
        result = await db.execute(select(Project).where(Project.slug == slug.lower().strip()))
        return result.scalars().first()

    @staticmethod
    async def create(db: AsyncSession, project: Project) -> Project:
        db.add(project)
        await db.flush()
        await db.refresh(project)
        return project

    @staticmethod
    async def update(db: AsyncSession, project: Project, update_data: Dict) -> Project:
        for field, value in update_data.items():
            if value is not None and hasattr(project, field):
                setattr(project, field, value)
        await db.flush()
        await db.refresh(project)
        return project

    @staticmethod
    async def delete(db: AsyncSession, project: Project) -> None:
        await db.delete(project)
        await db.flush()
