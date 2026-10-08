import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any, Optional
import httpx

from app.core.config import settings

logger = logging.getLogger("zovo.email")


class EmailService:
    @staticmethod
    async def send_customer_confirmation(enquiry: Dict[str, Any]) -> bool:
        """Sends confirmation email to the client who submitted the enquiry."""
        customer_email = enquiry.get("email")
        customer_name = enquiry.get("name", "there")
        enquiry_id = enquiry.get("id", "")

        subject = "ZOVO — We received your enquiry"
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D1017; color: #F4F6FA; margin: 0; padding: 24px; }}
            .container {{ max-width: 580px; margin: 0 auto; background-color: #14171F; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); padding: 32px; }}
            .header {{ margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; }}
            .brand {{ font-size: 22px; font-weight: 800; color: #F4F6FA; letter-spacing: 1px; }}
            .accent {{ color: #FF6B3D; }}
            .title {{ font-size: 18px; font-weight: 600; color: #F4F6FA; margin-top: 16px; }}
            .content {{ font-size: 14px; line-height: 1.6; color: #8E97A8; }}
            .highlight {{ color: #1F5BFF; font-weight: 600; }}
            .badge {{ display: inline-block; background-color: rgba(31, 91, 255, 0.15); color: #1F5BFF; padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 13px; margin: 12px 0; }}
            .footer {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #586274; text-align: center; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="brand">ZOVO<span class="accent">.</span></span>
            </div>
            <div class="title">Thank you for reaching out, {customer_name}!</div>
            <div class="content">
              <p>We have successfully received your project enquiry. Our team is reviewing the details of your request and will reach out to you shortly to discuss how we can turn your idea into a digital solution.</p>
              <div>Reference Enquiry ID:</div>
              <div class="badge">#{str(enquiry_id)[:8]}</div>
              <p>If you have any urgent questions or materials to share, you can reply directly to this email or reach us on WhatsApp at {settings.WHATSAPP_NUMBER}.</p>
            </div>
            <div class="footer">
              © 2026 ZOVO. Turning Ideas Into Digital Solutions.
            </div>
          </div>
        </body>
        </html>
        """
        
        return await EmailService._dispatch(
            to_email=customer_email,
            subject=subject,
            html_content=html_content,
        )

    @staticmethod
    async def send_admin_notification(enquiry: Dict[str, Any]) -> bool:
        """Sends notification email to ZOVO admin about new enquiry."""
        enquiry_id = enquiry.get("id", "")
        name = enquiry.get("name", "N/A")
        email = enquiry.get("email", "N/A")
        phone = enquiry.get("phone", "N/A")
        service = enquiry.get("service", "N/A")
        budget = enquiry.get("budget", "N/A")
        timeline = enquiry.get("timeline", "N/A")
        description = enquiry.get("description", "N/A")
        created_at = enquiry.get("created_at", "N/A")

        subject = f"New ZOVO Project Enquiry: {name} ({service})"
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0D1017; color: #F4F6FA; padding: 24px; }}
            .card {{ max-width: 600px; margin: 0 auto; background: #14171F; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 28px; }}
            .title {{ font-size: 18px; font-weight: 700; color: #1F5BFF; margin-bottom: 16px; }}
            .row {{ display: flex; margin-bottom: 10px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px; }}
            .label {{ width: 140px; font-weight: 600; color: #8E97A8; }}
            .val {{ flex: 1; color: #F4F6FA; }}
            .desc {{ background: #0D1017; padding: 12px; border-radius: 8px; margin-top: 12px; font-size: 13px; line-height: 1.5; color: #CCD2E0; white-space: pre-wrap; }}
          </style>
        </head>
        <body>
          <div class="card">
            <div class="title">New Project Enquiry Received</div>
            <div class="row"><div class="label">Enquiry ID:</div><div class="val">{enquiry_id}</div></div>
            <div class="row"><div class="label">Name:</div><div class="val">{name}</div></div>
            <div class="row"><div class="label">Email:</div><div class="val"><a href="mailto:{email}" style="color:#1F5BFF">{email}</a></div></div>
            <div class="row"><div class="label">Phone / WA:</div><div class="val">{phone or 'Not provided'}</div></div>
            <div class="row"><div class="label">Service:</div><div class="val"><strong>{service}</strong></div></div>
            <div class="row"><div class="label">Budget:</div><div class="val">{budget or 'Not specified'}</div></div>
            <div class="row"><div class="label">Timeline:</div><div class="val">{timeline or 'Not specified'}</div></div>
            <div class="row"><div class="label">Received At:</div><div class="val">{created_at}</div></div>
            <div style="margin-top: 14px; font-weight:600; font-size:13px; color:#8E97A8;">Project Requirement:</div>
            <div class="desc">{description}</div>
          </div>
        </body>
        </html>
        """

        return await EmailService._dispatch(
            to_email=settings.ADMIN_EMAIL,
            subject=subject,
            html_content=html_content,
        )

    @staticmethod
    async def _dispatch(to_email: str, subject: str, html_content: str) -> bool:
        """Internal dispatcher routing to Resend, SMTP, or graceful console logging."""
        # 1. Resend API
        if settings.RESEND_API_KEY:
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.post(
                        "https://api.resend.com/emails",
                        headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
                        json={
                            "from": settings.EMAIL_FROM,
                            "to": [to_email],
                            "subject": subject,
                            "html": html_content,
                        },
                        timeout=10.0,
                    )
                    if resp.status_code in (200, 201):
                        logger.info(f"Email sent via Resend to {to_email}")
                        return True
                    else:
                        logger.error(f"Resend error: {resp.status_code} {resp.text}")
            except Exception as e:
                logger.error(f"Failed sending email via Resend: {e}")

        # 2. SMTP
        if settings.SMTP_HOST and settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = settings.EMAIL_FROM
                msg["To"] = to_email
                msg.attach(MIMEText(html_content, "html"))

                with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                    server.starttls()
                    server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                    server.sendmail(settings.EMAIL_FROM, [to_email], msg.as_string())
                logger.info(f"Email sent via SMTP to {to_email}")
                return True
            except Exception as e:
                logger.error(f"Failed sending email via SMTP: {e}")

        # 3. Graceful Fallback / Console Preview (for local development and CI)
        logger.info(
            f"[EMAIL LOG - Simulating Dispatch]\n"
            f"To: {to_email}\n"
            f"Subject: {subject}\n"
            f"Provider: Console (Set RESEND_API_KEY or SMTP credentials to send real emails)\n"
        )
        return True
