-- ========================================================
-- ZOVO Platform - Default Seed SQL Data
-- ========================================================

-- Insert Initial Admin (Password: ZovoAdmin2026!Secure, hashed with bcrypt)
INSERT INTO users (id, email, hashed_password, full_name, is_active, is_superuser, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@zovo.digital',
    '$2b$12$620H6nL3W9tV3Y32sI9cXeL2d01F709bA8B8M8p1c2.1D5q0F.6Gy',
    'ZOVO Administrator',
    TRUE,
    TRUE,
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert 7 Core Services
INSERT INTO services (id, slug, title, short_description, full_description, features, deliverables, icon_name, is_active, "order", created_at, updated_at)
VALUES
(
    '00000000-0000-0000-0000-000000000010',
    'web-development',
    'Websites & Web Applications',
    'Modern responsive websites, scalable web applications, and digital platforms built for speed, SEO, and conversions.',
    'We architect and develop high-performance web applications tailored to your business goals. From high-converting corporate websites and SaaS platforms to dynamic customer portals, we turn requirements into reliable digital products.',
    '["Next.js & React architecture", "Responsive, mobile-optimized layouts", "SEO-ready semantic structures", "Fast performance & high Core Web Vitals", "Secure API integrations & database backends"]'::jsonb,
    '["Production-ready codebase", "Responsive cross-device testing", "CMS or admin dashboard integration", "Deployment on cloud infrastructure"]'::jsonb,
    'Globe',
    TRUE,
    1,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000020',
    'mobile-apps',
    'Mobile Applications',
    'Android, iOS, and cross-platform mobile applications engineered for native performance and delightful user experiences.',
    'We build intuitive mobile applications that give your users immediate, seamless access to your services on iOS and Android devices, whether starting from an early prototype or scaling an existing mobile product.',
    '["Cross-platform React Native & Flutter solutions", "Native performance & fluid micro-interactions", "Offline caching & push notification infrastructure", "Secure user authentication & token management", "App Store & Google Play submission readiness"]'::jsonb,
    '["Full mobile app binary builds (iOS & Android)", "Backend API connection layer", "TestFlight / Play Console deployment setup"]'::jsonb,
    'Smartphone',
    TRUE,
    2,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000030',
    'ui-ux',
    'UI/UX & Product Design',
    'User interfaces, design systems, and user experiences crafted with precision, clarity, and brand consistency.',
    'Great digital products start with clarity. We design interfaces that are purposeful, accessible, and intuitive, balancing brand identity with effortless usability.',
    '["User journey mapping & information architecture", "High-fidelity responsive UI designs", "Scalable design tokens & component systems", "Interactive prototypes for rapid user validation", "WCAG accessibility standards compliance"]'::jsonb,
    '["Complete Figma design workspace", "Interactive clickable prototype", "Design system guidelines and assets"]'::jsonb,
    'Palette',
    TRUE,
    3,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000040',
    'ai-solutions',
    'AI Solutions & Intelligent Systems',
    'AI-powered features, smart assistants, internal knowledge agents, and intelligent workflow automation.',
    'We help companies integrate practical artificial intelligence directly into their operations and customer-facing products, avoiding buzzwords to deliver real business utility.',
    '["Custom LLM integrations and retrieval augmented generation (RAG)", "Intelligent customer support & internal assistant bots", "Automated document processing & content classification", "Secure private data connectors without vendor lock-in", "Cost-optimized inference architectures"]'::jsonb,
    '["AI service endpoints & webhook integrations", "Vector database configuration", "Prompt engineering and safety filters", "Monitoring and latency tracking setup"]'::jsonb,
    'Sparkles',
    TRUE,
    4,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000050',
    'automation',
    'Business Workflow Automation',
    'Automate repetitive tasks, connect disjointed software tools, and streamline your operational workflows.',
    'Eliminate manual data entry, reduce human error, and connect your business applications together so your team can focus on high-leverage work.',
    '["Webhook triggers & automated cross-platform pipelines", "CRM, email, and billing integration workflows", "Automated notification and alert routing", "Data synchronization between disparate databases", "Audit trails and error reporting"]'::jsonb,
    '["Custom automation scripts & cloud runners", "Integration connector configurations", "Operational documentation and error alerts"]'::jsonb,
    'Zap',
    TRUE,
    5,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000060',
    'resume-portfolio',
    'Resume & Career Portfolios',
    'Professional executive resumes, personal portfolios, and career websites designed to showcase your accomplishments.',
    'Stand out to hiring managers and potential clients with an impeccably designed career site, interactive portfolio, or ATS-optimized modern resume.',
    '["Interactive project showcases & case study layouts", "ATS-compliant executive resume structuring", "Custom domain & personalized branding", "Integrated contact & booking forms", "Ultra-fast loading on mobile and desktop"]'::jsonb,
    '["Hosted personal portfolio site", "Editable resume master documents & print-ready PDFs", "Custom domain connection"]'::jsonb,
    'FileText',
    TRUE,
    6,
    NOW(),
    NOW()
),
(
    '00000000-0000-0000-0000-000000000070',
    'custom-software',
    'Custom Software & Internal Systems',
    'Custom digital products, internal dashboards, and purpose-built software architectures tailored to your requirements.',
    'When off-the-shelf software fails to match your operational reality, we engineer custom internal systems and software solutions built around your exact workflow.',
    '["Custom database architectures & REST/GraphQL APIs", "Role-based access control (RBAC) & security", "Operational dashboards & real-time analytics", "Third-party system integrations", "Modular codebases built for long-term maintainability"]'::jsonb,
    '["Complete custom software application", "Database schemas & automated migrations", "API documentation & administrative manual", "Deployment on chosen cloud infrastructure"]'::jsonb,
    'Code2',
    TRUE,
    7,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Default Site Settings
INSERT INTO site_settings (id, company_name, tagline, company_email, whatsapp_number, social_x, social_linkedin, social_github, website_url, seo_title_default, seo_description_default, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000099',
    'ZOVO',
    'Turning Ideas Into Digital Solutions.',
    'hello@zovo.digital',
    '+919876543210',
    'https://x.com/zovo_digital',
    'https://linkedin.com/company/zovo-digital',
    'https://github.com/zovo-digital',
    'https://zovo.digital',
    'ZOVO — Turning Ideas Into Digital Solutions',
    'ZOVO helps individuals, startups, and businesses turn ideas into modern digital experiences, products, and solutions.',
    NOW()
) ON CONFLICT DO NOTHING;
