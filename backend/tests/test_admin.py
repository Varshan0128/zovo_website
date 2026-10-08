import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_admin_enquiry_lifecycle(client: AsyncClient, admin_headers: dict):
    # 1. Submit enquiry via public endpoint
    post_res = await client.post(
        "/api/contact",
        json={
            "name": "Jane Doe",
            "email": "jane@techcorp.com",
            "service": "Mobile Apps",
            "description": "Looking for iOS and Android application with real-time updates.",
            "consent": True,
        },
    )
    assert post_res.status_code == 201
    enquiry_id = post_res.json()["enquiry_id"]

    # 2. Admin retrieves enquiries list
    list_res = await client.get("/api/admin/enquiries", headers=admin_headers)
    assert list_res.status_code == 200
    data = list_res.json()
    assert data["total"] >= 1
    assert any(item["id"] == enquiry_id for item in data["items"])

    # 3. Admin updates status and notes
    patch_res = await client.patch(
        f"/api/admin/enquiries/{enquiry_id}",
        headers=admin_headers,
        json={
            "status": "IN_PROGRESS",
            "priority": "HIGH",
            "admin_notes": "Followed up via email, scheduled discovery call.",
        },
    )
    assert patch_res.status_code == 200
    updated_data = patch_res.json()
    assert updated_data["status"] == "IN_PROGRESS"
    assert updated_data["priority"] == "HIGH"
    assert "discovery call" in updated_data["admin_notes"]

    # 4. Export CSV
    csv_res = await client.get("/api/admin/enquiries/export/csv", headers=admin_headers)
    assert csv_res.status_code == 200
    assert "text/csv" in csv_res.headers["content-type"]
    assert "jane@techcorp.com" in csv_res.text


@pytest.mark.asyncio
async def test_admin_projects_crud(client: AsyncClient, admin_headers: dict):
    # 1. Create project
    proj_payload = {
        "title": "Quantum Commerce",
        "description": "A high-performance modern commerce engine with instant checkout.",
        "category": "Web Applications",
        "technologies": ["Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS"],
        "featured": True,
        "published": True,
    }
    create_res = await client.post("/api/admin/projects", headers=admin_headers, json=proj_payload)
    assert create_res.status_code == 201
    created = create_res.json()
    project_id = created["id"]
    slug = created["slug"]

    # 2. Check public project endpoint
    public_res = await client.get(f"/api/projects/{slug}")
    assert public_res.status_code == 200
    assert public_res.json()["title"] == "Quantum Commerce"

    # 3. Update project
    patch_res = await client.patch(
        f"/api/admin/projects/{project_id}",
        headers=admin_headers,
        json={"title": "Quantum Commerce Platform"},
    )
    assert patch_res.status_code == 200
    assert patch_res.json()["title"] == "Quantum Commerce Platform"

    # 4. Check dashboard stats
    dash_res = await client.get("/api/admin/dashboard", headers=admin_headers)
    assert dash_res.status_code == 200
    dash_data = dash_res.json()
    assert dash_data["active_projects"] >= 1
    assert "new_enquiries" in dash_data

    # 5. Delete project
    del_res = await client.delete(f"/api/admin/projects/{project_id}", headers=admin_headers)
    assert del_res.status_code == 204
