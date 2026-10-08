from typing import Optional, List, Dict
from sqlalchemy import select, asc
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.service import Service


class ServiceRepository:
    @staticmethod
    async def get_all(db: AsyncSession, active_only: bool = True) -> List[Service]:
        query = select(Service)
        if active_only:
            query = query.where(Service.is_active == True)
        query = query.order_by(asc(Service.order), asc(Service.title))
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_by_slug(db: AsyncSession, slug: str) -> Optional[Service]:
        result = await db.execute(select(Service).where(Service.slug == slug.lower().strip()))
        return result.scalars().first()

    @staticmethod
    async def get_by_id(db: AsyncSession, service_id: str) -> Optional[Service]:
        result = await db.execute(select(Service).where(Service.id == service_id))
        return result.scalars().first()

    @staticmethod
    async def create(db: AsyncSession, service: Service) -> Service:
        db.add(service)
        await db.flush()
        await db.refresh(service)
        return service

    @staticmethod
    async def update(db: AsyncSession, service: Service, update_data: Dict) -> Service:
        for field, value in update_data.items():
            if value is not None and hasattr(service, field):
                setattr(service, field, value)
        await db.flush()
        await db.refresh(service)
        return service
