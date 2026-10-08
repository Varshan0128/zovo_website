import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_submit_contact_success(client: AsyncClient):
    payload = {
        "name": "Alex Morgan",
        "email": "alex@example.com",
        "phone": "+1234567890",
        "company": "NextGen Systems",
        "service": "Web Development",
        "budget": "₹50,000 – ₹1,00,000",
        "timeline": "1 month",
        "description": "We need a full-stack digital web portal for our clients with booking functionality.",
        "source": "Google Search",
        "consent": True,
    }

    response = await client.post("/api/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert "enquiry_id" in data
    assert "received" in data["message"].lower()


@pytest.mark.asyncio
async def test_submit_contact_validation_failure(client: AsyncClient):
    # Invalid email, missing required fields
    payload = {
        "name": "A",
        "email": "not-an-email",
        "service": "",
        "description": "Short",
        "consent": False,
    }

    response = await client.post("/api/contact", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_get_public_services(client: AsyncClient):
    response = await client.get("/api/services")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 7

    # Check slug retrieval
    slug = data[0]["slug"]
    slug_resp = await client.get(f"/api/services/{slug}")
    assert slug_resp.status_code == 200
    assert slug_resp.json()["slug"] == slug
