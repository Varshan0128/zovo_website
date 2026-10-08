import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Star,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Digital Presence That Commands Attention — Resume & Portfolio Solutions | ZOVO',
  description:
    'Present your career accomplishments with clarity and authority. We build custom portfolio websites and ATS-optimized executive resumes designed to stand out.',
};

const deliverables = [
  'Custom responsive personal portfolio website',
  'Executive resume design & ATS-compliant PDF export',
  'Interactive case study showcases & project breakdowns',
  'Custom domain & global CDN hosting setup',
  'Contact form & consultation booking integration',
  'Social OpenGraph cards & Google SEO metadata',
  'Fast sub-second load times & clean typography',
];

const processPhases = [
  { step: '01', title: 'Career Narrative Audit', desc: 'Analyzing your milestones, quantifiable achievements, leadership roles, and core objectives.' },
  { step: '02', title: 'Content Architecture', desc: 'Crafting persuasive case studies, role descriptions, and structured technology stacks.' },
  { step: '03', title: 'Visual Wireframing', desc: 'Designing elegant layouts that highlight your strongest work without visual clutter.' },
  { step: '04', title: 'Frontend Engineering', desc: 'Developing a lightning-fast responsive website optimized for both desktop and mobile.' },
  { step: '05', title: 'ATS Compliance & PDF', desc: 'Generating machine-readable resume documents that parse cleanly through recruitment bots.' },
  { step: '06', title: 'Domain & SEO Setup', desc: 'Configuring custom domain DNS, SSL certificates, search metadata, and rich link previews.' },
  { step: '07', title: 'Launch & Verification', desc: 'Final cross-browser review, performance validation, and production handover.' },
];

export default function ResumePortfolioPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <FileText size={13} className="text-[#1F5BFF]" />
            <span>PORTFOLIOS & RESUMES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Digital Presence That Commands Attention<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            Present your career accomplishments with clarity, authority, and elegance. We create
            executive-level resumes and interactive personal portfolio websites that leave a lasting impression on clients and hiring teams.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=Resume%20%26%20Portfolio"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Build Your Portfolio</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[8px] bg-white border border-[#14171F] px-6 py-3.5 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] hover:-translate-y-0.5 transition-all"
            >
              <span>All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 bg-[#F4F6FA] border-b border-[#E2E6EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF6B3D] uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>THE CHALLENGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">
            The Generic Profile Barrier
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            Standard templates and generic profile links fail to capture technical depth, strategic leadership, and real-world results.
            Hiring executives and premium clients review hundreds of applications—most get dismissed in seconds. A custom,
            interactive portfolio site with verified case studies and ATS-compliant resume formatting instantly signals exceptional professionalism.
          </p>
        </div>
      </section>

      {/* Pillars & Deliverables */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <UserCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Executive Authority</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Structured copy highlighting quantifiable business impact, strategic ownership, and career milestones with zero fluff.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Star size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Interactive Case Studies</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Project breakdowns with architecture diagrams, live demonstrations, measurable outcomes, and verified credentials.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Sparkles size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">ATS Compliance & Speed</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Strict semantic headings and metadata ensuring resumes pass automated applicant tracking scanners with 100% fidelity.
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Typical Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 flex items-center gap-3 shadow-xs"
                >
                  <CheckCircle2 size={16} className="text-[#1F5BFF] shrink-0" />
                  <span className="text-xs font-semibold text-[#14171F]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Breakdown */}
          <div className="pt-12 border-t border-[#E2E6EF] space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our Portfolio Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A focused timeline from career audit to live custom domain deployment:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {processPhases.map((phase) => (
                <SlideUp key={phase.step}>
                  <div className="rounded-xl bg-[#F4F6FA] border border-[#E2E6EF] p-6 space-y-2 h-full">
                    <span className="font-mono text-xs font-bold text-[#1F5BFF]">{phase.step}</span>
                    <h3 className="text-sm font-bold text-[#14171F]">{phase.title}</h3>
                    <p className="text-xs text-[#5A6578] leading-relaxed">{phase.desc}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
