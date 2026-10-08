# ZOVO REST API Documentation

The ZOVO platform features a RESTful API powered by **FastAPI** with **Pydantic v2** validation.

Base URL: `http://localhost:8000/api` (or configured `NEXT_PUBLIC_API_URL`)

---

## 1. Authentication

Protected admin endpoints require a valid JWT Bearer token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

Tokens are obtained by authenticating against `POST /api/admin/login`.

---

## 2. Public Endpoints

### Health Check
`GET /health`
- **Response**: `200 OK`
```json
{
  "status": "ok"
}
```

### Submit Project Enquiry
`POST /api/contact`
- **Rate Limit**: 5 requests / minute
- **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Smith Co",
  "service": "Web Application",
  "budget": "₹50,000 – ₹1,00,000",
  "timeline": "1 month",
  "description": "We need a custom booking web platform with client dashboard.",
  "source": "Google",
  "consent": true
}
```
- **Response**: `201 Created`
```json
{
  "success": true,
  "enquiry_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "message": "Thanks! Your project enquiry has been received. We'll get back to you soon."
}
```

### List Public Services
`GET /api/services`
- **Response**: `200 OK` (Array of active services with features and deliverables)

### Get Service by Slug
`GET /api/services/{slug}`
- **Parameters**: `slug` (e.g. `web-development`, `mobile-apps`, `ai-solutions`)
- **Response**: `200 OK` or `404 Not Found`

### List Published Projects
`GET /api/projects`
- **Query Params**: `category` (optional), `featured` (optional boolean)
- **Response**: `200 OK` (Array of published project items)

### Get Project by Slug
`GET /api/projects/{slug}`
- **Response**: `200 OK` or `404 Not Found`

### Get Public Settings
`GET /api/settings/public`
- **Response**: `200 OK` (Company name, email, WhatsApp number, social URLs, SEO defaults)

---

## 3. Protected Admin Endpoints

### Admin Login
`POST /api/admin/login`
- **Rate Limit**: 5 requests / minute
- **Request Body**:
```json
{
  "email": "admin@zovo.digital",
  "password": "ZovoAdmin2026!Secure"
}
```
- **Response**: `200 OK`
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "admin@zovo.digital",
    "full_name": "ZOVO Administrator",
    "is_active": true,
    "is_superuser": true,
    "created_at": "..."
  }
}
```

### Get Admin Profile
`GET /api/admin/me`
- **Requires**: Admin Auth
- **Response**: `200 OK`

### Dashboard KPI Statistics
`GET /api/admin/dashboard`
- **Requires**: Admin Auth
- **Response**: `200 OK`
```json
{
  "new_enquiries": 3,
  "in_progress_enquiries": 1,
  "converted_enquiries": 2,
  "total_enquiries": 6,
  "active_projects": 4,
  "published_projects": 3,
  "recent_enquiries": [...]
}
```

### List Enquiries with Filters
`GET /api/admin/enquiries`
- **Query Params**: `status` (NEW, CONTACTED, etc.), `priority` (LOW, MEDIUM, HIGH), `search`, `limit`, `offset`
- **Requires**: Admin Auth
- **Response**: `200 OK` (`{ items: [...], total: 6 }`)

### Update Enquiry CRM Status
`PATCH /api/admin/enquiries/{id}`
- **Requires**: Admin Auth
- **Request Body**:
```json
{
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "admin_notes": "Discovery call scheduled for Friday."
}
```
- **Response**: `200 OK`

### Export Enquiries CSV
`GET /api/admin/enquiries/export/csv`
- **Requires**: Admin Auth
- **Response**: `200 OK` (`text/csv` attachment)

### Delete Enquiry
`DELETE /api/admin/enquiries/{id}`
- **Requires**: Admin Auth
- **Response**: `204 No Content`

### Projects Management
- `GET /api/admin/projects` (Includes drafts)
- `POST /api/admin/projects` (Create project)
- `PATCH /api/admin/projects/{id}` (Update fields or publish/featured toggles)
- `DELETE /api/admin/projects/{id}` (Delete project)

### Services Management
- `GET /api/admin/services`
- `PATCH /api/admin/services/{id}`

### Site Settings Management
- `GET /api/admin/settings`
- `PUT /api/admin/settings`
