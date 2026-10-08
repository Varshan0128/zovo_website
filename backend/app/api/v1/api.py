from fastapi import APIRouter
from app.api.v1.endpoints import (
    contact,
    services,
    projects,
    settings,
    admin_auth,
    admin_enquiries,
    admin_projects,
    admin_services,
    admin_dashboard,
    admin_settings,
)

api_router = APIRouter()

# Public Endpoints
api_router.include_router(contact.router, tags=["Contact"])
api_router.include_router(services.router, tags=["Services"])
api_router.include_router(projects.router, tags=["Projects"])
api_router.include_router(settings.router, tags=["Settings"])

# Admin Endpoints
api_router.include_router(admin_auth.router, tags=["Admin Auth"])
api_router.include_router(admin_dashboard.router, tags=["Admin Dashboard"])
api_router.include_router(admin_enquiries.router, tags=["Admin Enquiries"])
api_router.include_router(admin_projects.router, tags=["Admin Projects"])
api_router.include_router(admin_services.router, tags=["Admin Services"])
api_router.include_router(admin_settings.router, tags=["Admin Settings"])
