import logging
from fastapi import APIRouter, Depends, Request, BackgroundTasks, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.email import EmailService
from app.core.rate_limit import limiter
from app.models.enquiry import ContactSubmission
from app.repositories.enquiry_repo import EnquiryRepository
from app.schemas.enquiry import ContactCreate, ContactCreateResponse

logger = logging.getLogger("zovo.api.contact")
router = APIRouter()


@router.post(
    "/contact",
    response_model=ContactCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit project enquiry",
)
@limiter.limit("5/minute")
async def submit_contact(
    request: Request,
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """
    Receives and stores customer project enquiries, sends client confirmation,
    and alerts ZOVO admin.
    """
    submission = ContactSubmission(
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=payload.phone.strip() if payload.phone else None,
        company=payload.company.strip() if payload.company else None,
        service=payload.service.strip(),
        budget=payload.budget,
        timeline=payload.timeline,
        description=payload.description.strip(),
        source=payload.source,
        consent=payload.consent,
        status="NEW",
        priority="MEDIUM",
    )

    created_submission = await EnquiryRepository.create(db, submission)

    # Prepare safe serializable dictionary for email dispatch
    enquiry_data = {
        "id": created_submission.id,
        "name": created_submission.name,
        "email": created_submission.email,
        "phone": created_submission.phone,
        "company": created_submission.company,
        "service": created_submission.service,
        "budget": created_submission.budget,
        "timeline": created_submission.timeline,
        "description": created_submission.description,
        "created_at": created_submission.created_at.strftime("%Y-%m-%d %H:%M:%S UTC")
        if created_submission.created_at
        else "Just now",
    }

    # Dispatch confirmation email to client and alert email to admin in background
    background_tasks.add_task(EmailService.send_customer_confirmation, enquiry_data)
    background_tasks.add_task(EmailService.send_admin_notification, enquiry_data)

    ref_id = f"ZOVO-{created_submission.id.replace('-', '')[:6].upper()}"
    logger.info(f"Enquiry registered successfully: ID={created_submission.id} Ref={ref_id} from {created_submission.email}")

    return ContactCreateResponse(
        success=True,
        enquiry_id=created_submission.id,
        reference_id=ref_id,
        message="Thanks! Your project enquiry has been received. We'll get back to you soon.",
    )
