import os
import csv
import logging
from datetime import datetime, timezone
import httpx
from app.core.config import settings

logger = logging.getLogger("zovo.sheet_logger")

CSV_HEADER = [
    "Timestamp (UTC)",
    "Lead ID",
    "Name",
    "Phone",
    "Email",
    "Reference Available",
    "Role / Domain",
    "Notes",
    "Status",
]

# Ensure data directory exists
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data"))
os.makedirs(DATA_DIR, exist_ok=True)
SHEET_CSV_PATH = os.path.join(DATA_DIR, "portfolio_leads_sheet.csv")

# Also mirror to root for easy user access
ROOT_SHEET_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "portfolio_leads_sheet.csv"))


def _init_sheet_if_missing(file_path: str):
    if not os.path.exists(file_path):
        with open(file_path, mode="w", newline="", encoding="utf-8-sig") as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADER)


def append_lead_to_sheet(
    lead_id: str,
    name: str,
    phone: str,
    email: str,
    reference_available: str | None = None,
    domain_or_role: str | None = None,
    notes: str | None = None,
    status: str = "NEW",
) -> bool:
    """
    Appends a new portfolio applicant row directly to the spreadsheet CSV files.
    """
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    row = [
        timestamp,
        lead_id,
        name,
        phone,
        email,
        reference_available or "None",
        domain_or_role or "Not specified",
        (notes or "").replace("\n", " "),
        status,
    ]

    for path in [SHEET_CSV_PATH, ROOT_SHEET_PATH]:
        try:
            _init_sheet_if_missing(path)
            with open(path, mode="a", newline="", encoding="utf-8-sig") as f:
                writer = csv.writer(f)
                writer.writerow(row)
            logger.info(f"Appended portfolio lead {lead_id} to sheet at {path}")
        except Exception as e:
            logger.error(f"Failed to append lead to sheet {path}: {e}")

    # Optional Google Sheet Webhook trigger
    webhook_url = getattr(settings, "GOOGLE_SHEET_WEBHOOK_URL", None) or os.getenv("GOOGLE_SHEET_WEBHOOK_URL")
    if webhook_url:
        try:
            payload = {
                "timestamp": timestamp,
                "lead_id": lead_id,
                "name": name,
                "phone": phone,
                "email": email,
                "reference_available": reference_available or "",
                "domain_or_role": domain_or_role or "",
                "notes": notes or "",
                "status": status,
            }
            with httpx.Client(timeout=5.0) as client:
                client.post(webhook_url, json=payload)
                logger.info(f"Forwarded lead {lead_id} to external Google Sheet webhook")
        except Exception as e:
            logger.warning(f"Google Sheet webhook notification failed: {e}")

    return True


def read_sheet_csv() -> str:
    """Reads the current CSV spreadsheet content for download."""
    _init_sheet_if_missing(SHEET_CSV_PATH)
    try:
        with open(SHEET_CSV_PATH, mode="r", encoding="utf-8-sig") as f:
            return f.read()
    except Exception as e:
        logger.error(f"Could not read sheet CSV: {e}")
        return ",".join(CSV_HEADER) + "\n"
