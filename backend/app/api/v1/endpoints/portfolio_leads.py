import logging
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Response, status, Request
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.rate_limit import limiter
from app.models.portfolio_lead import PortfolioLead
from app.schemas.portfolio_lead import PortfolioLeadCreate, PortfolioLeadOut, PortfolioLeadResponse
from app.utils.sheet_logger import append_lead_to_sheet, read_sheet_csv

logger = logging.getLogger("zovo.api.portfolio_leads")
router = APIRouter()


@router.post(
    "/portfolio-leads",
    response_model=PortfolioLeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Portfolio User Application & Save to Sheet",
)
@limiter.limit("10/minute")
async def submit_portfolio_lead(
    request: Request,
    payload: PortfolioLeadCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Receives portfolio service enquiries from users, stores them in the database,
    and automatically records the row into the leads spreadsheet (CSV/Google Sheet).
    """
    lead = PortfolioLead(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        email=payload.email.lower().strip(),
        reference_available=payload.reference_available.strip() if payload.reference_available else None,
        domain_or_role=payload.domain_or_role.strip() if payload.domain_or_role else None,
        notes=payload.notes.strip() if payload.notes else None,
        status="NEW",
    )

    db.add(lead)
    await db.commit()
    await db.refresh(lead)

    # Immediately store to local spreadsheet CSV & optional webhook
    append_lead_to_sheet(
        lead_id=lead.id,
        name=lead.name,
        phone=lead.phone,
        email=lead.email,
        reference_available=lead.reference_available,
        domain_or_role=lead.domain_or_role,
        notes=lead.notes,
        status=lead.status,
    )

    reference_code = f"PORT-{lead.id[:6].upper()}"

    return PortfolioLeadResponse(
        success=True,
        message="Your portfolio application was successfully received and recorded in our client spreadsheet. Our lead strategist will review your details shortly.",
        lead_id=lead.id,
        sheet_saved=True,
        reference_code=reference_code,
    )


@router.get(
    "/portfolio-leads",
    response_model=List[PortfolioLeadOut],
    summary="List all portfolio leads",
)
async def list_portfolio_leads(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve portfolio applicant leads ordered by most recent."""
    stmt = select(PortfolioLead).order_by(desc(PortfolioLead.created_at)).offset(offset).limit(limit)
    result = await db.execute(stmt)
    leads = result.scalars().all()
    return [PortfolioLeadOut.model_validate(item) for item in leads]


@router.get(
    "/portfolio-leads/export/csv",
    summary="Download Portfolio Leads Spreadsheet CSV",
)
async def export_portfolio_leads_sheet():
    """Download the current live portfolio leads CSV spreadsheet."""
    csv_content = read_sheet_csv()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=zovo_portfolio_leads_sheet.csv"},
    )
