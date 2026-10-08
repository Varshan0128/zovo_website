import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_admin_login_success(client: AsyncClient):
    response = await client.post(
        "/api/admin/login",
        json={"email": "admin@zovo.digital", "password": "ZovoAdmin2026!Secure"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "admin@zovo.digital"


@pytest.mark.asyncio
async def test_admin_login_invalid_password(client: AsyncClient):
    response = await client.post(
        "/api/admin/login",
        json={"email": "admin@zovo.digital", "password": "WrongPassword123!"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_admin_me_protected(client: AsyncClient, admin_headers: dict):
    # Without header -> 401
    resp_unauth = await client.get("/api/admin/me")
    assert resp_unauth.status_code == 401

    # With header -> 200
    resp_auth = await client.get("/api/admin/me", headers=admin_headers)
    assert resp_auth.status_code == 200
    assert resp_auth.json()["email"] == "admin@zovo.digital"
