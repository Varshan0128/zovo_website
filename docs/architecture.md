# ZOVO Platform — System Architecture Blueprint

This document details the software architecture, data flow, component boundaries, and security model of the **ZOVO** digital solutions platform.

---

## 1. High-Level Architecture Overview

```
                      +-----------------------------+
                      |       Client Browser        |
                      +-----------------------------+
                                     |
               +---------------------+---------------------+
               | (HTTPS / CDN)                             | (HTTPS API)
               v                                           v
    +-----------------------+                   +-----------------------+
    |  Next.js 16+ Frontend |                   |   FastAPI Backend     |
    |  (Vercel / Node SSR)  |                   |  (Python 3.12+ ASGI)  |
    +-----------------------+                   +-----------------------+
               |                                           |
               | (Static Pre-render / RSC)                 | (SQLAlchemy 2.0 Async)
               |                                           v
               |                                +-----------------------+
               |                                | PostgreSQL 16 (DB)    |
               |                                | (Supabase / Managed)  |
               +------------------------------->+-----------------------+
```

---

## 2. Monorepo Organization

```
/zovo
  ├── frontend/                 # Next.js 16+ (App Router, Tailwind CSS, TypeScript)
  │   ├── app/                  # Route handlers, dynamic layouts, static pre-rendered pages
  │   ├── components/           # UI design system, brand assets, modals, forms
  │   ├── hooks/                # Custom React hooks (useAuth)
  │   ├── lib/                  # API client, analytics abstraction, utility functions
  │   ├── types/                # Strict TypeScript interfaces
  │   └── styles/               # Theme tokens & brand variables
  │
  ├── backend/                  # FastAPI REST API (Python 3.12+, Async SQLAlchemy 2.0)
  │   ├── app/
  │   │   ├── api/v1/           # API endpoints (Public & Protected Admin routes)
  │   │   ├── core/             # Config, security, async database session, email dispatcher
  │   │   ├── models/           # SQLAlchemy Declarative Models
  │   │   ├── schemas/          # Pydantic v2 validation and serialization schemas
  │   │   ├── repositories/     # Data access layer with pagination & filters
  │   │   └── utils/            # Database auto-seed scripts
  │   ├── alembic/              # Database schema migrations
  │   └── tests/                # Pytest async test suite
  │
  ├── database/                 # SQL schemas, seed scripts, backup guides
  ├── docs/                     # Architectural, API, deployment, and security guides
  ├── docker-compose.yml        # Multi-container orchestration (DB, API, Web)
  └── README.md                 # Master documentation
```

---

## 3. Brand Identity & Design System: SEAM

- **Concept**: Connected modular building blocks interlocking along a distinctive Z-shaped seam.
- **Color Palette**:
  - **Ink Charcoal** (`#14171F`): Foundation surfaces & card containers.
  - **Midnight** (`#0D1017`): Deep background canvases.
  - **Electric Blue** (`#1F5BFF`): Primary brand accent, primary CTA buttons, links.
  - **Signal Coral** (`#FF6B3D`): Signature accent nodes, smart tech badges.
  - **Cloud** (`#F4F6FA`): Crisp readable typography and contrast elements.

---

## 4. Key Functional Flows

### A. Contact Enquiry Pipeline
1. Visitor fills out the form at `/contact` (with client-side validation and invisible honeypot spam protection).
2. Request is dispatched via `POST /api/contact` with IP-based rate limiting (`5 requests / minute`).
3. Backend validates input schema via Pydantic (`ContactCreate`).
4. Enquiry record is persisted in `contact_submissions` table with status `NEW` and a unique UUID.
5. In the background (non-blocking ASGI task), the `EmailService` sends:
   - A confirmation email to the client with their reference ID.
   - An alert notification to the ZOVO admin email with full requirement details.
6. The client is redirected to `/thank-you` with their submission reference ID.

### B. Admin CRM & Dashboard Flow
1. Admin authenticates at `/admin/login` using credentials.
2. Backend verifies password hash using **bcrypt** and issues a signed **JWT Bearer Token** (valid 24h).
3. The Admin dashboard (`/admin`) displays real-time KPI counts: New, In Progress, Converted, and Total.
4. From `/admin/enquiries`, admin can inspect full requirement notes, update status, prioritize leads, log internal follow-up notes, and export CSV reports.
5. From `/admin/projects`, admin can publish/unpublish portfolio projects, update featured tags, and attach technology stacks.
