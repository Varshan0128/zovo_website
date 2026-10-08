from datetime import datetime
from typing import Optional, List, Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict

EnquiryStatusType = Literal["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED", "SPAM"]
EnquiryPriorityType = Literal["LOW", "MEDIUM", "HIGH"]


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=100)
    company: Optional[str] = Field(None, max_length=255)
    service: str = Field(..., min_length=2, max_length=100)
    budget: Optional[str] = Field(None, max_length=100)
    timeline: Optional[str] = Field(None, max_length=100)
    description: str = Field(..., min_length=10, max_length=5000)
    source: Optional[str] = Field(None, max_length=255)
    consent: bool = Field(..., description="User consent required")


class ContactOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: str
    budget: Optional[str] = None
    timeline: Optional[str] = None
    description: str
    source: Optional[str] = None
    consent: bool
    status: str
    priority: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContactCreateResponse(BaseModel):
    success: bool = True
    enquiry_id: str
    reference_id: Optional[str] = None
    message: str = "Thanks! Your project enquiry has been received. We'll get back to you soon."


class EnquiryUpdate(BaseModel):
    status: Optional[EnquiryStatusType] = None
    priority: Optional[EnquiryPriorityType] = None
    admin_notes: Optional[str] = None


class EnquiryListResponse(BaseModel):
    items: List[ContactOut]
    total: int
