# ZOVO Production Deployment Guide

This guide covers deployment workflows for:
1. **Frontend**: Vercel (recommended) or custom Node/Docker container.
2. **Backend**: Render, Railway, or VPS (Ubuntu/Docker).
3. **Database**: Supabase PostgreSQL or managed PostgreSQL instance.

---

## 1. Database Setup (Supabase / Managed PostgreSQL)

1. Create a PostgreSQL project on [Supabase](https://supabase.com) or your preferred provider.
2. Under Database Settings, locate your connection string (URI).
3. Use the Connection Pooler or direct connection string:
   ```
   postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
4. Run the database initialization:
   ```bash
   psql "$DATABASE_URL" -f database/init.sql
   psql "$DATABASE_URL" -f database/seed.sql
   ```
   *(Alternatively, the FastAPI backend will automatically run migrations/table initialization and default seeding on its first startup).*

---

## 2. Backend API Deployment (Render / Railway / VPS)

### Option A: Render
1. Create a **New Web Service** connected to your repository.
2. Set Root Directory to `backend`.
3. Set Environment to **Python 3**.
4. Set Build Command:
   ```bash
   pip install -r requirements.txt
   ```
5. Set Start Command:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
6. Add Environment Variables:
   - `DATABASE_URL`: `postgresql+asyncpg://...`
   - `SECRET_KEY`: `[Generated 32+ character random string]`
   - `ENVIRONMENT`: `production`
   - `ADMIN_EMAIL`: `admin@zovo.digital`
   - `ADMIN_INITIAL_PASSWORD`: `[Your secure admin password]`
   - `BACKEND_CORS_ORIGINS`: `["https://zovo.digital", "https://your-vercel-domain.vercel.app"]`
   - `RESEND_API_KEY`: `[Your Resend API key]`
   - `EMAIL_FROM`: `ZOVO <notifications@zovo.digital>`
7. Verify health check at `https://your-backend.onrender.com/health`.

### Option B: VPS via Docker Compose
```bash
git clone https://github.com/your-org/zovo.git /opt/zovo
cd /opt/zovo
cp .env.example .env
# Edit .env with your production credentials
docker compose up -d
```

---

## 3. Frontend Deployment (Vercel)

1. Connect your repository to [Vercel](https://vercel.com).
2. Configure Project Root Directory: `frontend`.
3. Framework Preset: **Next.js**.
4. Configure Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend.onrender.com` (Your live backend URL)
   - `NEXT_PUBLIC_SITE_URL`: `https://zovo.digital`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `+919876543210`
   - `NEXT_PUBLIC_COMPANY_EMAIL`: `hello@zovo.digital`
   - `NEXT_PUBLIC_GA_ID`: `G-XXXXXXXXXX` (Optional)
5. Click **Deploy**. Vercel will build the Next.js bundle and deploy to global edge CDNs.
6. Connect your custom domain `zovo.digital` in Vercel Domain settings.

---

## 4. Verification Post-Deployment

- [ ] Check public homepage at `https://zovo.digital`
- [ ] Submit a test project enquiry from `/contact`
- [ ] Confirm confirmation email was received
- [ ] Log in to Admin portal at `/admin/login`
- [ ] Verify test enquiry appears on `/admin/enquiries`
- [ ] Check responsive layout on mobile device
- [ ] Click the floating WhatsApp button to test pre-filled message
