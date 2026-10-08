from datetime import datetime, timezone
from sqlalchemy import String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import generate_uuid, get_utc_now


class SiteSetting(Base):
    __tablename__ = "site_settings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    company_name: Mapped[str] = mapped_column(String(100), default="ZOVO", nullable=False)
    tagline: Mapped[str] = mapped_column(String(255), default="Turning Ideas Into Digital Solutions.", nullable=False)
    company_email: Mapped[str] = mapped_column(String(255), default="hello@zovo.digital", nullable=False)
    whatsapp_number: Mapped[str] = mapped_column(String(50), default="+919876543210", nullable=False)
    social_x: Mapped[str] = mapped_column(String(255), default="https://x.com/zovo_digital", nullable=True)
    social_linkedin: Mapped[str] = mapped_column(String(255), default="https://linkedin.com/company/zovo-digital", nullable=True)
    social_github: Mapped[str] = mapped_column(String(255), default="https://github.com/zovo-digital", nullable=True)
    website_url: Mapped[str] = mapped_column(String(255), default="https://zovo.digital", nullable=False)
    seo_title_default: Mapped[str] = mapped_column(String(255), default="ZOVO — Turning Ideas Into Digital Solutions", nullable=False)
    seo_description_default: Mapped[str] = mapped_column(
        Text,
        default="ZOVO helps individuals, startups, and businesses turn ideas into modern digital experiences, products, and solutions.",
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now,
        onupdate=get_utc_now,
    )
