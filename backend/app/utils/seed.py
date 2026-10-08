import logging
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import get_password_hash
from app.models.user import User
from app.models.service import Service
from app.models.setting import SiteSetting

logger = logging.getLogger("zovo.seed")

DEFAULT_SERVICES = [
    {
        "slug": "web-development",
        "title": "Websites & Web Applications",
        "short_description": "Modern responsive websites, scalable web applications, and digital platforms built for speed, SEO, and conversions.",
        "full_description": "We architect and develop high-performance web applications tailored to your business goals. From high-converting corporate websites and SaaS platforms to dynamic customer portals, we turn requirements into reliable digital products.",
        "features": [
            "Next.js & React architecture",
            "Responsive, mobile-optimized layouts",
            "SEO-ready semantic structures",
            "Fast performance & high Core Web Vitals",
            "Secure API integrations & database backends"
        ],
        "deliverables": [
            "Production-ready codebase",
            "Responsive cross-device testing",
            "CMS or admin dashboard integration",
            "Deployment on cloud infrastructure"
        ],
        "icon_name": "Globe",
        "order": 1,
    },
    {
        "slug": "mobile-apps",
        "title": "Mobile Applications",
        "short_description": "Android, iOS, and cross-platform mobile applications engineered for native performance and delightful user experiences.",
        "full_description": "We build intuitive mobile applications that give your users immediate, seamless access to your services on iOS and Android devices, whether starting from an early prototype or scaling an existing mobile product.",
        "features": [
            "Cross-platform React Native & Flutter solutions",
            "Native performance & fluid micro-interactions",
            "Offline caching & push notification infrastructure",
            "Secure user authentication & token management",
            "App Store & Google Play submission readiness"
        ],
        "deliverables": [
            "Full mobile app binary builds (iOS & Android)",
            "Backend API connection layer",
            "TestFlight / Play Console deployment setup"
        ],
        "icon_name": "Smartphone",
        "order": 2,
    },
    {
        "slug": "ui-ux",
        "title": "UI/UX & Product Design",
        "short_description": "User interfaces, design systems, and user experiences crafted with precision, clarity, and brand consistency.",
        "full_description": "Great digital products start with clarity. We design interfaces that are purposeful, accessible, and intuitive, balancing brand identity with effortless usability.",
        "features": [
            "User journey mapping & information architecture",
            "High-fidelity responsive UI designs",
            "Scalable design tokens & component systems",
            "Interactive prototypes for rapid user validation",
            "WCAG accessibility standards compliance"
        ],
        "deliverables": [
            "Complete Figma design workspace",
            "Interactive clickable prototype",
            "Design system guidelines and assets"
        ],
        "icon_name": "Palette",
        "order": 3,
    },
    {
        "slug": "ai-solutions",
        "title": "AI Solutions & Intelligent Systems",
        "short_description": "AI-powered features, smart assistants, internal knowledge agents, and intelligent workflow automation.",
        "full_description": "We help companies integrate practical artificial intelligence directly into their operations and customer-facing products, avoiding buzzwords to deliver real business utility.",
        "features": [
            "Custom LLM integrations and retrieval augmented generation (RAG)",
            "Intelligent customer support & internal assistant bots",
            "Automated document processing & content classification",
            "Secure private data connectors without vendor lock-in",
            "Cost-optimized inference architectures"
        ],
        "deliverables": [
            "AI service endpoints & webhook integrations",
            "Vector database configuration",
            "Prompt engineering and safety filters",
            "Monitoring and latency tracking setup"
        ],
        "icon_name": "Sparkles",
        "order": 4,
    },
    {
        "slug": "automation",
        "title": "Business Workflow Automation",
        "short_description": "Automate repetitive tasks, connect disjointed software tools, and streamline your operational workflows.",
        "full_description": "Eliminate manual data entry, reduce human error, and connect your business applications together so your team can focus on high-leverage work.",
        "features": [
            "Webhook triggers & automated cross-platform pipelines",
            "CRM, email, and billing integration workflows",
            "Automated notification and alert routing",
            "Data synchronization between disparate databases",
            "Audit trails and error reporting"
        ],
        "deliverables": [
            "Custom automation scripts & cloud runners",
            "Integration connector configurations",
            "Operational documentation and error alerts"
        ],
        "icon_name": "Zap",
        "order": 5,
    },
    {
        "slug": "resume-portfolio",
        "title": "Resume & Career Portfolios",
        "short_description": "Professional executive resumes, personal portfolios, and career websites designed to showcase your accomplishments.",
        "full_description": "Stand out to hiring managers and potential clients with an impeccably designed career site, interactive portfolio, or ATS-optimized modern resume.",
        "features": [
            "Interactive project showcases & case study layouts",
            "ATS-compliant executive resume structuring",
            "Custom domain & personalized branding",
            "Integrated contact & booking forms",
            "Ultra-fast loading on mobile and desktop"
        ],
        "deliverables": [
            "Hosted personal portfolio site",
            "Editable resume master documents & print-ready PDFs",
            "Custom domain connection"
        ],
        "icon_name": "FileText",
        "order": 6,
    },
    {
        "slug": "custom-software",
        "title": "Custom Software & Internal Systems",
        "short_description": "Custom digital products, internal dashboards, and purpose-built software architectures tailored to your requirements.",
        "full_description": "When off-the-shelf software fails to match your operational reality, we engineer custom internal systems and software solutions built around your exact workflow.",
        "features": [
            "Custom database architectures & REST/GraphQL APIs",
            "Role-based access control (RBAC) & security",
            "Operational dashboards & real-time analytics",
            "Third-party system integrations",
            "Modular codebases built for long-term maintainability"
        ],
        "deliverables": [
            "Complete custom software application",
            "Database schemas & automated migrations",
            "API documentation & administrative manual",
            "Deployment on chosen cloud infrastructure"
        ],
        "icon_name": "Code2",
        "order": 7,
    },
]


async def seed_all(db: AsyncSession) -> None:
    """Run all seed operations: admin user, default services, and site settings."""
    # 1. Admin User
    admin_result = await db.execute(select(User).where(User.email == settings.ADMIN_EMAIL.lower()))
    admin_user = admin_result.scalars().first()
    if not admin_user:
        hashed_pw = get_password_hash(settings.ADMIN_INITIAL_PASSWORD)
        admin_user = User(
            email=settings.ADMIN_EMAIL.lower(),
            hashed_password=hashed_pw,
            full_name="ZOVO Administrator",
            is_active=True,
            is_superuser=True,
        )
        db.add(admin_user)
        logger.info(f"Seeded initial admin user: {settings.ADMIN_EMAIL}")

    # 2. Services
    for svc_data in DEFAULT_SERVICES:
        slug = svc_data["slug"]
        existing = await db.execute(select(Service).where(Service.slug == slug))
        if not existing.scalars().first():
            new_svc = Service(
                slug=slug,
                title=svc_data["title"],
                short_description=svc_data["short_description"],
                full_description=svc_data["full_description"],
                features=svc_data["features"],
                deliverables=svc_data["deliverables"],
                icon_name=svc_data["icon_name"],
                order=svc_data["order"],
                is_active=True,
            )
            db.add(new_svc)
            logger.info(f"Seeded service: {slug}")

    # 3. Site Settings
    settings_res = await db.execute(select(SiteSetting))
    if not settings_res.scalars().first():
        site_setting = SiteSetting(
            company_name="ZOVO",
            tagline="Turning Ideas Into Digital Solutions.",
            company_email=settings.EMAIL_FROM.split("<")[-1].replace(">", "").strip() or "hello@zovo.digital",
            whatsapp_number=settings.WHATSAPP_NUMBER,
            website_url=settings.SITE_URL,
            seo_title_default="ZOVO — Turning Ideas Into Digital Solutions",
            seo_description_default="ZOVO helps individuals, startups, and businesses turn ideas into modern digital experiences, products, and solutions.",
        )
        db.add(site_setting)
        logger.info("Seeded default site settings")

    await db.commit()
    logger.info("Seeding completed successfully.")
