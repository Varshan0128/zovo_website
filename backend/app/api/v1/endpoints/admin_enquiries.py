import csv
import io
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin_user
from app.core.database import get_db
from app.models.user import User
from app.repositories.enquiry_repo import EnquiryRepository
from app.schemas.enquiry import ContactOut, EnquiryListResponse, EnquiryUpdate

router = APIRouter()


@router.get("/admin/enquiries", response_model=EnquiryListResponse, summary="List enquiries with filters")
async def list_enquiries(
    status: Optional[str] = Query(None, description="Filter by status (NEW, CONTACTED, etc.)"),
    priority: Optional[str] = Query(None, description="Filter by priority (LOW, MEDIUM, HIGH)"),
    search: Optional[str] = Query(None, description="Search term for name, email, or service"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve enquiries with CRM filters and pagination."""
    items, total = await EnquiryRepository.get_all(
        db,
        status=status,
        priority=priority,
        search=search,
        limit=limit,
        offset=offset,
    )
    return EnquiryListResponse(items=[ContactOut.model_validate(i) for i in items], total=total)


@router.get("/admin/enquiries/export/csv", summary="Export enquiries to CSV")
async def export_enquiries_csv(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Generate and download CSV report of all contact enquiries."""
    items, _ = await EnquiryRepository.get_all(db, limit=10000, offset=0)

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "ID",
        "Date",
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Budget",
        "Timeline",
        "Status",
        "Priority",
        "Description",
        "Admin Notes",
    ])

    for item in items:
        writer.writerow([
            item.id,
            item.created_at.strftime("%Y-%m-%d %H:%M:%S") if item.created_at else "",
            item.name,
            item.email,
            item.phone or "",
            item.company or "",
            item.service,
            item.budget or "",
            item.timeline or "",
            item.status,
            item.priority,
            item.description.replace("\n", " "),
            (item.admin_notes or "").replace("\n", " "),
        ])

    csv_content = output.getvalue()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=zovo_enquiries_export.csv"},
    )


@router.get("/admin/enquiries/{id}", response_model=ContactOut, summary="Get enquiry details")
async def get_enquiry_detail(
    id: str,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve full details of an enquiry."""
    enquiry = await EnquiryRepository.get_by_id(db, id)
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
    return ContactOut.model_validate(enquiry)


@router.patch("/admin/enquiries/{id}", response_model=ContactOut, summary="Update enquiry CRM status")
async def update_enquiry(
    id: str,
    payload: EnquiryUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Update status, priority, or internal admin notes."""
    enquiry = await EnquiryRepository.get_by_id(db, id)
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")

    update_dict = payload.model_dump(exclude_unset=True)
    updated = await EnquiryRepository.update(db, enquiry, update_dict)
    return ContactOut.model_validate(updated)


@router.delete("/admin/enquiries/{id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete spam enquiry")
async def delete_enquiry(
    id: str,
    current_user: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Remove a spam or invalid enquiry submission."""
    enquiry = await EnquiryRepository.get_by_id(db, id)
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")

    await EnquiryRepository.delete(db, enquiry)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
