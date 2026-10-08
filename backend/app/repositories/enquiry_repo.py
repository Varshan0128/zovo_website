from typing import Optional, List, Tuple, Dict
from sqlalchemy import select, func, desc, or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.enquiry import ContactSubmission


class EnquiryRepository:
    @staticmethod
    async def create(db: AsyncSession, submission: ContactSubmission) -> ContactSubmission:
        db.add(submission)
        await db.flush()
        await db.refresh(submission)
        return submission

    @staticmethod
    async def get_by_id(db: AsyncSession, enquiry_id: str) -> Optional[ContactSubmission]:
        result = await db.execute(select(ContactSubmission).where(ContactSubmission.id == enquiry_id))
        return result.scalars().first()

    @staticmethod
    async def get_all(
        db: AsyncSession,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        search: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Tuple[List[ContactSubmission], int]:
        query = select(ContactSubmission)
        count_query = select(func.count(ContactSubmission.id))

        filters = []
        if status:
            filters.append(ContactSubmission.status == status.upper())
        if priority:
            filters.append(ContactSubmission.priority == priority.upper())
        if search:
            search_pattern = f"%{search.strip()}%"
            filters.append(
                or_(
                    ContactSubmission.name.ilike(search_pattern),
                    ContactSubmission.email.ilike(search_pattern),
                    ContactSubmission.service.ilike(search_pattern),
                    ContactSubmission.company.ilike(search_pattern),
                )
            )

        if filters:
            query = query.where(*filters)
            count_query = count_query.where(*filters)

        total_res = await db.execute(count_query)
        total = total_res.scalar() or 0

        query = query.order_by(desc(ContactSubmission.created_at)).offset(offset).limit(limit)
        items_res = await db.execute(query)
        items = list(items_res.scalars().all())

        return items, total

    @staticmethod
    async def update(
        db: AsyncSession,
        enquiry: ContactSubmission,
        update_data: Dict,
    ) -> ContactSubmission:
        for field, value in update_data.items():
            if value is not None and hasattr(enquiry, field):
                setattr(enquiry, field, value)
        await db.flush()
        await db.refresh(enquiry)
        return enquiry

    @staticmethod
    async def delete(db: AsyncSession, enquiry: ContactSubmission) -> None:
        await db.delete(enquiry)
        await db.flush()

    @staticmethod
    async def get_counts(db: AsyncSession) -> Dict[str, int]:
        new_cnt = await db.scalar(select(func.count(ContactSubmission.id)).where(ContactSubmission.status == "NEW")) or 0
        in_prog_cnt = await db.scalar(
            select(func.count(ContactSubmission.id)).where(ContactSubmission.status == "IN_PROGRESS")
        ) or 0
        converted_cnt = await db.scalar(
            select(func.count(ContactSubmission.id)).where(ContactSubmission.status == "CONVERTED")
        ) or 0
        total_cnt = await db.scalar(select(func.count(ContactSubmission.id))) or 0

        return {
            "new": new_cnt,
            "in_progress": in_prog_cnt,
            "converted": converted_cnt,
            "total": total_cnt,
        }
