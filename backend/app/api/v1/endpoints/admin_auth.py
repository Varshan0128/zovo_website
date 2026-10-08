from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.core.rate_limit import limiter
from app.core.security import verify_password, create_access_token
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.auth import LoginRequest, TokenResponse, UserOut

router = APIRouter()


@router.post("/admin/login", response_model=TokenResponse, summary="Admin Login")
@limiter.limit("5/minute")
async def admin_login(
    request: Request,
    payload: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Secure administrator login returning JWT bearer token."""
    user = await UserRepository.get_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive",
        )

    access_token = create_access_token(subject=user.id)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(user),
    )


@router.get("/admin/me", response_model=UserOut, summary="Get Current Admin Profile")
async def get_admin_me(current_user: User = Depends(get_current_admin_user)):
    """Retrieve currently authenticated administrator profile."""
    return UserOut.model_validate(current_user)


@router.post("/admin/logout", summary="Admin Logout")
async def admin_logout(current_user: User = Depends(get_current_admin_user)):
    """Acknowledge admin logout."""
    return {"message": "Successfully logged out"}
