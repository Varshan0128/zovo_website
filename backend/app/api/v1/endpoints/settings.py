from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repositories.setting_repo import SettingRepository
from app.schemas.setting import PublicSettingOut

router = APIRouter()


@router.get("/settings/public", response_model=PublicSettingOut, summary="Get public website metadata")
async def get_public_settings(db: AsyncSession = Depends(get_db)):
    """Retrieve public branding and contact details for header, footer, and metadata."""
    settings = await SettingRepository.get_or_create(db)
    return settings
