import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import { Globe, CheckCircle2, ArrowRight, HelpCircle, Code2, Layers, Cpu } from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Websites Built Around Your Goals — Web Development | ZOVO',
  description:
    'Responsive websites, business websites, landing pages, web applications, admin panels, and API integrations.',
};

const deliverables = [
  'Responsive websites',
  'Business websites',
  'Landing pages',
  'Web applications',
  'Admin panels',
  'API integrations',
  'CMS integrations',
];

const processPhases = [
  { step: '01', title: 'Discovery', desc: 'Understanding your business model, audience, and key goals.' },
  { step: '02', title: 'Planning', desc: 'Defining wireframes, information architecture, and tech stack.' },
  { step: '03', title: 'Design', desc: 'Crafting responsive user interfaces with high usability.' },
  { step: '04', title: 'Development', desc: 'Writing clean Next.js, React, and backend code.' },
  { step: '05', title: 'Testing', desc: 'Cross-browser testing, accessibility, and speed optimizations.' },
  { step: '06', title: 'Launch', desc: 'Domain configuration, SSL setup, and deployment.' },
  { step: '07', title: 'Support', desc: 'Post-launch maintenance and technical guidance.' },
];

export default function WebDevelopmentPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <Globe size={13} className="text-[#1F5BFF]" />
            <span>WEB DEVELOPMENT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Websites Built Around Your Goals<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            From modern responsive marketing websites to full-stack web applications and custom admin panels,
            we engineer digital platforms tailored directly to your operational needs.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=Web%20Development"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Start Web Project</span>
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
            Why Generic Templates Often Fail
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            Pre-made website themes are weighed down with unused scripts, rigid layouts, and generic styling that fails
            to reflect your actual business workflow. When you need custom functionality or rapid page speed, template
            limitations become costly roadblocks. We build tailored architectures with clean code, fast load times,
            and precise design.
          </p>
        </div>
      </section>

      {/* Deliverables & Process */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Typical Deliverables</h2>
            <p className="text-sm text-[#5A6578]">
              Solutions we regularly engineer for startups, businesses, and professionals:
            </p>
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

          {/* Process Breakdown (7 Steps) */}
          <div className="pt-12 border-t border-[#E2E6EF] space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our Development Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A predictable journey from early discussion to production handover:
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
