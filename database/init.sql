-- ========================================================
-- ZOVO Platform - Production PostgreSQL Initialization
-- Database Schema for Users, Enquiries, Services, Projects, Settings, Audits
-- ========================================================

-- Enable UUID extension if supported
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_superuser BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_users_email ON users(email);

-- 2. Contact Submissions Table (Enquiries CRM)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    company VARCHAR(255),
    service VARCHAR(100) NOT NULL,
    budget VARCHAR(100),
    timeline VARCHAR(100),
    description TEXT NOT NULL,
    source VARCHAR(255),
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS ix_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS ix_contact_submissions_created_at ON contact_submissions(created_at);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'Globe',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_services_slug ON services(slug);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(500),
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    client_name VARCHAR(255),
    project_url VARCHAR(500),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS ix_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS ix_projects_created_at ON projects(created_at);

-- 5. Project Images Table
CREATE TABLE IF NOT EXISTS project_images (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(36) PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL DEFAULT 'ZOVO',
    tagline VARCHAR(255) NOT NULL DEFAULT 'Turning Ideas Into Digital Solutions.',
    company_email VARCHAR(255) NOT NULL DEFAULT 'hello@zovo.digital',
    whatsapp_number VARCHAR(50) NOT NULL DEFAULT '+919876543210',
    social_x VARCHAR(255) DEFAULT 'https://x.com/zovo_digital',
    social_linkedin VARCHAR(255) DEFAULT 'https://linkedin.com/company/zovo-digital',
    social_github VARCHAR(255) DEFAULT 'https://github.com/zovo-digital',
    website_url VARCHAR(255) NOT NULL DEFAULT 'https://zovo.digital',
    seo_title_default VARCHAR(255) NOT NULL DEFAULT 'ZOVO — Turning Ideas Into Digital Solutions',
    seo_description_default TEXT NOT NULL DEFAULT 'ZOVO helps individuals, startups, and businesses turn ideas into modern digital experiences, products, and solutions.',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(100) NOT NULL,
    target_id VARCHAR(100),
    ip_address VARCHAR(50),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_audit_logs_created_at ON audit_logs(created_at);
