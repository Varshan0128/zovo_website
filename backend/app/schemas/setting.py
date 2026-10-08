from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class SettingUpdate(BaseModel):
    company_name: Optional[str] = None
    tagline: Optional[str] = None
    company_email: Optional[str] = None
    whatsapp_number: Optional[str] = None
    social_x: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_github: Optional[str] = None
    website_url: Optional[str] = None
    seo_title_default: Optional[str] = None
    seo_description_default: Optional[str] = None


class SettingOut(BaseModel):
    id: str
    company_name: str
    tagline: str
    company_email: str
    whatsapp_number: str
    social_x: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_github: Optional[str] = None
    website_url: str
    seo_title_default: str
    seo_description_default: str
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PublicSettingOut(BaseModel):
    company_name: str
    tagline: str
    company_email: str
    whatsapp_number: str
    social_x: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_github: Optional[str] = None
    website_url: str
    seo_title_default: str
    seo_description_default: str

    model_config = ConfigDict(from_attributes=True)
