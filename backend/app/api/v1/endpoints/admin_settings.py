from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.models.user import User
from app.repositories.setting_repo import SettingRepository
from app.schemas.setting import SettingOut, SettingUpdate

router = APIRouter()


@router.get("/admin/settings", response_model=SettingOut, summary="Get site settings for admin")
async def get_admin_settings(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve site configuration details."""
    settings = await SettingRepository.get_or_create(db)
    return SettingOut.model_validate(settings)


@router.put("/admin/settings", response_model=SettingOut, summary="Update site settings")
async def update_admin_settings(
    payload: SettingUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Update company metadata, WhatsApp contact, SEO defaults, and social links."""
    settings = await SettingRepository.get_or_create(db)
    update_dict = payload.model_dump(exclude_unset=True)
    updated = await SettingRepository.update(db, settings, update_dict)
    return SettingOut.model_validate(updated)
