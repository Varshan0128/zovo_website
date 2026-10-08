import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "ZOVO API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = "development"

    # Security
    SECRET_KEY: str = "zovo-super-secret-jwt-key-change-in-production-2026-secure"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    # Default to sqlite+aiosqlite for local zero-config testing if PostgreSQL is not active;
    # Can be overridden by DATABASE_URL in .env
    DATABASE_URL: str = "sqlite+aiosqlite:///./zovo.db"

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str) -> str:
        if not v:
            return "sqlite+aiosqlite:///./zovo.db"
        # Support common hosting URL prefixes (e.g. Supabase, Render, Railway)
        if v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql+asyncpg://", 1)
        if v.startswith("postgresql://") and not v.startswith("postgresql+asyncpg://"):
            return v.replace("postgresql://", "postgresql+asyncpg://", 1)
        return v

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "https://zovo.digital",
    ]

    # Admin Initial Credentials for Seeding
    ADMIN_EMAIL: str = "admin@zovo.digital"
    ADMIN_INITIAL_PASSWORD: str = "ZovoAdmin2026!Secure"

    # Email System
    EMAIL_PROVIDER: str = "auto"  # "auto", "resend", "smtp", "console"
    RESEND_API_KEY: str = ""
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "ZOVO <notifications@zovo.digital>"

    # WhatsApp & Contact
    WHATSAPP_NUMBER: str = "+919876543210"
    SITE_URL: str = "http://localhost:3000"

    # Rate Limiting
    RATE_LIMIT_CONTACT: str = "5/minute"
    RATE_LIMIT_LOGIN: str = "5/minute"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
