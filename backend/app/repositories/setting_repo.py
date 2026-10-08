from typing import Dict
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.setting import SiteSetting


class SettingRepository:
    @staticmethod
    async def get_or_create(db: AsyncSession) -> SiteSetting:
        result = await db.execute(select(SiteSetting))
        setting = result.scalars().first()
        if not setting:
            setting = SiteSetting()
            db.add(setting)
            await db.flush()
            await db.refresh(setting)
        return setting

    @staticmethod
    async def update(db: AsyncSession, setting: SiteSetting, update_data: Dict) -> SiteSetting:
        for field, value in update_data.items():
            if value is not None and hasattr(setting, field):
                setattr(setting, field, value)
        await db.flush()
        await db.refresh(setting)
        return setting
