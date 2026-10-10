from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class PortfolioLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150, description="Full name of applicant")
    phone: str = Field(..., min_length=5, max_length=50, description="Contact phone or WhatsApp number")
    email: EmailStr = Field(..., description="Valid contact email address")
    reference_available: Optional[str] = Field(None, max_length=1000, description="Optional portfolio reference link, GitHub, LinkedIn, or sample website")
    domain_or_role: Optional[str] = Field(None, max_length=150, description="Target career role or profession (e.g., Senior Full Stack Dev, UI/UX Designer)")
    notes: Optional[str] = Field(None, max_length=2000, description="Specific goals or requirements")


class PortfolioLeadOut(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    reference_available: Optional[str] = None
    domain_or_role: Optional[str] = None
    notes: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PortfolioLeadResponse(BaseModel):
    success: bool = True
    message: str = "Thank you! Your portfolio enquiry has been submitted and recorded to the spreadsheet."
    lead_id: str
    sheet_saved: bool = True
    reference_code: str
