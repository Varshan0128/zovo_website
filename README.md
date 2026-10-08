# ZOVO — Turning Ideas Into Digital Solutions

> A complete, production-ready full-stack digital platform for **ZOVO**, a service-based digital company.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 1. Company & Brand Identity

**ZOVO** is a service-based digital company that turns customer ideas into practical, modern digital solutions. ZOVO is not positioned as merely a web development agency; we provide end-to-end capabilities across:
- Websites & Web Applications
- Mobile Applications (iOS & Android)
- UI/UX & Product Design
- Artificial Intelligence Solutions & Systems
- Business Workflow Automation
- Executive Resumes & Career Portfolios
- Custom Software & Internal Tooling

### Brand Concept: SEAM
The ZOVO brand identity represents connected digital building blocks linked by a distinctive Z-shaped seam.

### Brand Colors:
- **Ink Charcoal**: `#14171F` (Primary foundation)
- **Midnight**: `#0D1017` (Deep background)
- **Electric Blue**: `#1F5BFF` (Primary brand accent)
- **Signal Coral**: `#FF6B3D` (Signature accent nodes)
- **Cloud**: `#F4F6FA` (Readable typography)

---

## 2. Tech Stack

- **Frontend**: Next.js 16+ (App Router), TypeScript, Tailwind CSS v4, Lucide icons, Framer Motion
- **Backend API**: FastAPI (Python 3.12+), Pydantic v2, SQLAlchemy 2.0 Async, Alembic
- **Database**: PostgreSQL 16 (with out-of-the-box SQLite fallback for instant zero-dependency local dev)
- **Authentication**: JWT Bearer Tokens, Bcrypt password hashing
- **Email Service**: Multi-provider abstraction (Resend API, SMTP, or graceful console logger)
- **Containerization**: Docker, Docker Compose

---

## 3. Monorepo Project Structure

```
/zovo
  ├── frontend/                 # Next.js 16+ Frontend Web App
  │   ├── app/                  # App Router: Home, Services, Work, About, Contact, Admin
  │   ├── components/           # UI components, brand marks, forms, modals
  │   ├── hooks/                # Custom React hooks (useAuth)
  │   ├── lib/                  # API client, analytics abstraction, utilities
  │   ├── types/                # TypeScript interfaces
  │   └── styles/               # Brand CSS variables & global tokens
  │
  ├── backend/                  # FastAPI Backend API
  │   ├── app/
  │   │   ├── api/v1/           # API routes (Public & Protected Admin routes)
  │   │   ├── core/             # Config, security, DB engine, email dispatcher
  │   │   ├── models/           # SQLAlchemy 2.0 ORM models
  │   │   ├── schemas/          # Pydantic v2 request/response schemas
  │   │   ├── repositories/     # Data access layer
  │   │   └── utils/            # Automatic database seed logic
  │   ├── alembic/              # Database schema migrations
  │   ├── tests/                # Pytest async test suite
  │   └── requirements.txt      # Python dependencies
  │
  ├── database/                 # SQL schemas & backup documentation
  │   ├── init.sql              # PostgreSQL initialization script
  │   ├── seed.sql              # Default seed data
  │   └── backup_strategy.md    # Disaster recovery and backup guide
  │
  ├── docs/                     # Comprehensive architecture and API documentation
  │   ├── architecture.md       # High-level architecture and data flows
  │   ├── api.md                # REST API endpoints & request schemas
  │   ├── deployment.md         # Deployment to Vercel, Render, Supabase
  │   └── security.md           # Production security hardening checklist
  │
  ├── docker-compose.yml        # Docker Compose configuration (Postgres, API, Web)
  ├── .env.example              # Global environment variables template
  └── README.md                 # This file
```

---

## 4. Quick Start (Local Setup)

### Prerequisites
- **Node.js**: v20+ or v22+
- **Python**: v3.12+
- **Docker** *(Optional, for containerized local PostgreSQL)*

---

### Step 1: Clone & Configure Environment

```bash
git clone https://github.com/your-org/zovo.git
cd zovo
cp .env.example .env
```

---

### Step 2: Run the Backend API

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server (starts with SQLite local DB out of the box)
uvicorn main:app --reload --port 8000
```

> **API is live at**: `http://localhost:8000`  
> **Interactive Docs**: `http://localhost:8000/docs`  
> **Health Check**: `http://localhost:8000/health`  
> *(On initial startup, default services, site settings, and the initial admin user are automatically seeded)*

---

### Step 3: Run the Next.js Frontend

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

> **Public Website**: `http://localhost:3000`  
> **Admin Portal**: `http://localhost:3000/admin/login`

---

## 5. Default Admin Credentials

Upon initial database initialization, the default admin is created:
- **Email**: `admin@zovo.digital`
- **Password**: `ZovoAdmin2026!Secure`

*(You can customize these via `ADMIN_EMAIL` and `ADMIN_INITIAL_PASSWORD` in your `.env` file)*.

---

## 6. Running Tests

### Backend Test Suite (Pytest)
```bash
cd backend
.venv\Scripts\activate
pytest -v
```
The test suite covers:
- `/health` availability
- Contact submission validation & processing
- Public services & projects endpoints
- Admin authentication & JWT tokens
- Admin CRM enquiry workflow & CSV export
- Admin projects CRUD

### Frontend Production Build Test
```bash
cd frontend
npm run build
```

---

## 7. Running with Docker Compose

To spin up PostgreSQL, the FastAPI API, and the Next.js frontend with a single command:

```bash
docker compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`

---

## 8. Database Migrations (Alembic)

```bash
cd backend
.venv\Scripts\activate

# Run latest migrations
alembic upgrade head

# Generate a new migration
alembic revision -m "add_new_column"
```

---

## 9. Production Deployment Summary

- **Frontend**: Deploy to **Vercel** with Root Directory set to `frontend`.
- **Backend**: Deploy to **Render** or **Railway** with Root Directory set to `backend`.
- **Database**: Use managed **Supabase** or **AWS RDS** PostgreSQL.
- See detailed instructions in [docs/deployment.md](docs/deployment.md).

---

## 10. License

© 2026 ZOVO. All rights reserved.
