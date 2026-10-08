import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  Globe,
  Smartphone,
  Palette,
  Sparkles,
  Zap,
  FileText,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Digital Capabilities & Services — ZOVO',
  description:
    'Explore ZOVO digital capabilities: Website development, Web applications, Mobile apps, UI/UX design, AI solutions, Automation, and Career portfolios.',
};

const fullServicesList = [
  {
    slug: 'web-development',
    title: 'Websites & Web Applications',
    icon: Globe,
    headline: 'High-performance websites and scalable cloud web platforms.',
    description:
      'We architect fast, accessible, and conversion-focused websites and full-stack web applications. Whether you need a corporate brand website, an operational customer portal, or custom cloud software, we engineer it on modern foundations.',
    features: [
      'Next.js & React App Router architecture',
      'Mobile-first responsive layout engineering',
      'Core Web Vitals optimization and clean technical SEO',
      'Secure backend API & PostgreSQL database integrations',
    ],
    deliverables: ['Custom Codebase', 'Content Management', 'Responsive Testing', 'Cloud Deployment'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Applications',
    icon: Smartphone,
    headline: 'Cross-platform iOS and Android apps engineered for fluid performance.',
    description:
      'Turn your mobile product concept into a reliable application. We design and develop cross-platform mobile apps that give your users 60fps responsive performance and seamless interfaces.',
    features: [
      'React Native cross-platform architecture',
      'Smooth micro-interactions and native gesture handling',
      'Offline-ready state and push notifications',
      'Secure token storage and biometric authentication',
    ],
    deliverables: ['iOS & Android Builds', 'Backend Sync Layer', 'App Store Setup Guides'],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX & Product Design',
    icon: Palette,
    headline: 'Intuitive design systems, wireframes, and interactive product interfaces.',
    description:
      'Clarity drives usability. We design interfaces that are purposeful, accessible, and intuitive. From initial wireframes to complete Figma component systems, we design software people enjoy using.',
    features: [
      'User journey mapping & information architecture',
      'High-fidelity responsive UI mockups',
      'Design tokens and reusable component libraries',
      'WCAG AA accessible contrast and typography',
    ],
    deliverables: ['Interactive Figma Workspace', 'Design Tokens & Assets', 'Clickable Prototype'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions & Intelligent Systems',
    icon: Sparkles,
    headline: 'Practical AI-powered features, smart assistants, and automated intelligence.',
    description:
      'We help businesses integrate practical artificial intelligence directly into their operations and customer touchpoints. No empty hype—only deterministic tools that save time and create value.',
    features: [
      'Custom LLM integrations and retrieval systems (RAG)',
      'Intelligent customer assistants and support agents',
      'Automated document extraction and text classification',
      'Private data connectors without vendor lock-in',
    ],
    deliverables: ['AI Service Endpoints', 'Knowledge Base Connectors', 'Monitoring & Guardrails'],
  },
  {
    slug: 'automation',
    title: 'Business Workflow Automation',
    icon: Zap,
    headline: 'Connect your software stack and eliminate repetitive manual workflows.',
    description:
      'Streamline your internal processes by automating data flows between your CRM, email, databases, and third-party SaaS tools. Reduce human error and scale your business with less effort.',
    features: [
      'Webhook triggers & multi-step workflow pipelines',
      'CRM, payment, and communications integration',
      'Automated notification and task routing',
      'Audit logging and instant failure notifications',
    ],
    deliverables: ['Automation Runners', 'Webhook Connectors', 'Operational Documentation'],
  },
  {
    slug: 'resume-portfolio',
    title: 'Resume & Career Portfolios',
    icon: FileText,
    headline: 'Standout executive resumes and interactive personal portfolio sites.',
    description:
      'Present your skills, accomplishments, and case studies with authority. We create modern, interactive portfolio sites and ATS-compliant executive resumes tailored for leaders and professionals.',
    features: [
      'Custom branded portfolio websites',
      'ATS-optimized resume structuring and formatting',
      'Interactive case studies & media showcases',
      'Ultra-fast load times with custom domain support',
    ],
    deliverables: ['Hosted Portfolio Site', 'Master Resume Templates', 'Print-Ready PDF Exports'],
  },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
            <span>CAPABILITIES & ARCHITECTURE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Digital Capabilities Built Around Your Goals<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed max-w-2xl mx-auto">
            ZOVO provides comprehensive digital solutions. We examine your requirements and engineer the
            appropriate digital system, from modern web applications to intelligent automation.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-20 md:py-28 bg-[#F4F6FA] border-b border-[#E2E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {fullServicesList.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <SlideUp key={svc.slug} delay={idx * 0.05}>
                <div
                  id={svc.slug}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 md:p-12 shadow-[0_8px_30px_rgba(20,23,31,0.03)] hover:border-[#1F5BFF]/50 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#F4F6FA] border border-[#E2E6EF] text-[#1F5BFF]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-[#1F5BFF]">0{idx + 1}</span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">{svc.title}</h2>
                        </div>
                      </div>

                      <p className="text-base font-semibold text-[#14171F]">
                        {svc.headline}
                      </p>

                      <p className="text-sm text-[#5A6578] leading-relaxed">
                        {svc.description}
                      </p>

                      {/* Capabilities checklist */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {svc.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5 text-xs text-[#14171F]">
                            <CheckCircle2 size={15} className="text-[#1F5BFF] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5 bg-[#F4F6FA] rounded-xl border border-[#E2E6EF] p-6 space-y-5 flex flex-col justify-between h-full">
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6578] font-semibold block">
                          TYPICAL DELIVERABLES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {svc.deliverables.map((deliv) => (
                            <span
                              key={deliv}
                              className="text-xs font-mono px-2.5 py-1 rounded-[6px] bg-[#FFFFFF] border border-[#E2E6EF] text-[#14171F]"
                            >
                              {deliv}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E2E6EF] flex flex-col sm:flex-row items-center gap-3">
                        <Link
                          href={`/services/${svc.slug}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-2.5 text-xs font-semibold text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
                        >
                          <span>Deep Dive</span>
                          <ArrowRight size={13} />
                        </Link>
                        <Link
                          href={`/contact?service=${encodeURIComponent(svc.title)}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#1F5BFF] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#1347D8] transition-colors"
                        >
                          <span>Start This Project</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
