from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class ServiceCreate(BaseModel):
    slug: str = Field(..., min_length=2, max_length=100)
    title: str = Field(..., min_length=2, max_length=255)
    short_description: str
    full_description: str
    features: List[str] = Field(default_factory=list)
    deliverables: List[str] = Field(default_factory=list)
    icon_name: str = "Globe"
    is_active: bool = True
    order: int = 0


class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    features: Optional[List[str]] = None
    deliverables: Optional[List[str]] = None
    icon_name: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


class ServiceOut(BaseModel):
    id: str
    slug: str
    title: str
    short_description: str
    full_description: str
    features: List[str]
    deliverables: List[str]
    icon_name: str
    is_active: bool
    order: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
