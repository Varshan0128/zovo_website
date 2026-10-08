from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.repositories.enquiry_repo import EnquiryRepository
from app.schemas.dashboard import DashboardStatsResponse
from app.schemas.enquiry import ContactOut

router = APIRouter()


@router.get("/admin/dashboard", response_model=DashboardStatsResponse, summary="Get Admin Dashboard KPI Stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve summarized KPIs for admin overview screen."""
    counts = await EnquiryRepository.get_counts(db)
    recent_items, _ = await EnquiryRepository.get_all(db, limit=5, offset=0)

    # Project counts
    published_cnt = await db.scalar(
        select(func.count(Project.id)).where(Project.published == True)
    ) or 0
    total_projects_cnt = await db.scalar(select(func.count(Project.id))) or 0

    return DashboardStatsResponse(
        new_enquiries=counts["new"],
        in_progress_enquiries=counts["in_progress"],
        converted_enquiries=counts["converted"],
        total_enquiries=counts["total"],
        active_projects=total_projects_cnt,
        published_projects=published_cnt,
        recent_enquiries=[ContactOut.model_validate(i) for i in recent_items],
    )
