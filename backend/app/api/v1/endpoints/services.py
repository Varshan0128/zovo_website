from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repositories.service_repo import ServiceRepository
from app.schemas.service import ServiceOut

router = APIRouter()


@router.get("/services", response_model=List[ServiceOut], summary="List all active services")
async def list_services(db: AsyncSession = Depends(get_db)):
    """Retrieve all public active digital services offered by ZOVO."""
    services = await ServiceRepository.get_all(db, active_only=True)
    return services


@router.get("/services/{slug}", response_model=ServiceOut, summary="Get service by slug")
async def get_service(slug: str, db: AsyncSession = Depends(get_db)):
    """Retrieve full details of a specific service offering by its URL slug."""
    service = await ServiceRepository.get_by_slug(db, slug)
    if not service or not service.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with slug '{slug}' not found",
        )
    return service
