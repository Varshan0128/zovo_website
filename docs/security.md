# ZOVO Security Architecture & Production Hardening Guide

Security is a foundational pillar of the ZOVO digital platform. This document outlines the security controls implemented across the frontend, backend, database, and infrastructure layers.

---

## 1. Security Controls Summary

| Layer | Implemented Protections |
|-------|--------------------------|
| **Transport** | HTTPS-only configuration, HSTS header (`max-age=31536000; includeSubDomains`) |
| **Headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block` |
| **Authentication** | Password hashing with **bcrypt** (cost 12), signed **JWT tokens** with expiration |
| **Rate Limiting** | SlowAPI endpoint limiting: `5 requests/minute` on `/api/contact` and `/api/admin/login` |
| **SQL Injection** | Parameterized queries and ORM mappings via **SQLAlchemy 2.0 Async** |
| **Cross-Site Scripting (XSS)** | React JSX automatic escaping, strict input sanitization, security response headers |
| **Spam Prevention** | Client honeypot tokens, server-side length and email format validators |
| **Audit Logging** | High-impact administrative actions tracked with IP and timestamp in `audit_logs` |

---

## 2. Password Hashing & Credentials

- Passwords are never stored in plaintext.
- We utilize `bcrypt` with automatically generated per-password random salts and 12 work rounds.
- Tokens use HMAC SHA-256 (`HS256`) signed with `SECRET_KEY`.
- In production, `SECRET_KEY` must be generated using cryptographically secure random bytes:
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(48))"
  ```

---

## 3. Rate Limiting Policy

- Public Contact Endpoint (`POST /api/contact`):
  - Limits client IP to 5 submissions per minute to prevent form flooding and spam.
- Admin Login Endpoint (`POST /api/admin/login`):
  - Limits login attempts to 5 requests per minute to prevent brute-force attacks.

---

## 4. Production Checklist

1. **Environment Secrets**:
   - Ensure `.env` is listed in `.gitignore` and never committed.
   - Set unique, random values for `SECRET_KEY` and `JWT_SECRET`.
2. **Database Hardening**:
   - Limit database network access to backend IP/VPC only.
   - Use SSL connection mode (`sslmode=require`) in production strings.
3. **CORS Restrictions**:
   - Do NOT use wildcard `*` origins in production. Specify exact domains (e.g., `["https://zovo.digital"]`).
4. **Email Security**:
   - Configure SPF, DKIM, and DMARC records for `zovo.digital` on your DNS provider.
