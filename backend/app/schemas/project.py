from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    description: str = Field(..., min_length=10)
    category: str = Field(..., max_length=100)
    thumbnail: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    client_name: Optional[str] = None
    project_url: Optional[str] = None
    featured: bool = False
    published: bool = True


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    thumbnail: Optional[str] = None
    images: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    client_name: Optional[str] = None
    project_url: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None


class ProjectOut(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    category: str
    thumbnail: Optional[str] = None
    images: List[str]
    technologies: List[str]
    client_name: Optional[str] = None
    project_url: Optional[str] = None
    featured: bool
    published: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
