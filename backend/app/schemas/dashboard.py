from typing import List
from pydantic import BaseModel
from app.schemas.enquiry import ContactOut


class DashboardStatsResponse(BaseModel):
    new_enquiries: int
    in_progress_enquiries: int
    converted_enquiries: int
    total_enquiries: int
    active_projects: int
    published_projects: int
    recent_enquiries: List[ContactOut]
