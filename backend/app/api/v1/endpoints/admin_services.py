from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.models.user import User
from app.repositories.service_repo import ServiceRepository
from app.schemas.service import ServiceOut, ServiceUpdate

router = APIRouter()


@router.get("/admin/services", response_model=List[ServiceOut], summary="List all services for admin")
async def list_admin_services(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all services including inactive ones."""
    services = await ServiceRepository.get_all(db, active_only=False)
    return [ServiceOut.model_validate(s) for s in services]


@router.patch("/admin/services/{id}", response_model=ServiceOut, summary="Update service details")
async def update_admin_service(
    id: str,
    payload: ServiceUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Edit service descriptions, features, deliverables, or active status."""
    service = await ServiceRepository.get_by_id(db, id)
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    update_dict = payload.model_dump(exclude_unset=True)
    updated = await ServiceRepository.update(db, service, update_dict)
    return ServiceOut.model_validate(updated)
