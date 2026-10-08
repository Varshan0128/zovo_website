from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class ContactSubmission(Base, TimestampMixin):
    __tablename__ = "contact_submissions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(100), nullable=True)
    company: Mapped[str] = mapped_column(String(255), nullable=True)
    service: Mapped[str] = mapped_column(String(100), nullable=False)
    budget: Mapped[str] = mapped_column(String(100), nullable=True)
    timeline: Mapped[str] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    source: Mapped[str] = mapped_column(String(255), nullable=True)
    consent: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Status: NEW, CONTACTED, IN_PROGRESS, CONVERTED, CLOSED, SPAM
    status: Mapped[str] = mapped_column(String(50), default="NEW", index=True, nullable=False)

    # Priority: LOW, MEDIUM, HIGH
    priority: Mapped[str] = mapped_column(String(50), default="MEDIUM", nullable=False)

    # Internal CRM notes for ZOVO admin
    admin_notes: Mapped[str] = mapped_column(Text, nullable=True)
