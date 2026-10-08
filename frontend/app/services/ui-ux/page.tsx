import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  Palette,
  CheckCircle2,
  ArrowRight,
  Eye,
  Grid,
  Component,
  HelpCircle,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Interfaces Designed for Clarity and Conversion — UI/UX Design | ZOVO',
  description:
    'Human-centered digital product design. Turning complex workflows into clean, effortless user experiences with scalable design systems.',
};

const deliverables = [
  'Wireframing & user journeys',
  'Interactive Figma prototypes',
  'Complete UI design systems',
  'Design audits & usability reviews',
  'Mobile & web interface design',
  'WCAG AA accessibility validation',
  'Developer handoff documentation & tokens',
];

const processPhases = [
  { step: '01', title: 'User Research', desc: 'Understanding user behavior, business goals, and current usability obstacles.' },
  { step: '02', title: 'Information Architecture', desc: 'Structuring navigation hierarchies, user paths, and logical page sequences.' },
  { step: '03', title: 'Wireframing', desc: 'Low-fidelity layout exploration to validate screen content and functional balance.' },
  { step: '04', title: 'Design System', desc: 'Defining typography, color tokens, form elements, and responsive component libraries.' },
  { step: '05', title: 'High-Fidelity UI', desc: 'Designing production-ready screens with pixel-level precision and refined micro-states.' },
  { step: '06', title: 'Interactive Prototype', desc: 'Clickable Figma prototypes for stakeholder alignment and real user feedback.' },
  { step: '07', title: 'Developer Handoff', desc: 'Providing clean component specs, CSS tokens, and exported assets for engineers.' },
];

export default function UiUxPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <Palette size={13} className="text-[#1F5BFF]" />
            <span>PRODUCT DESIGN & UX</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Interfaces Designed for Clarity and Conversion<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            Clear digital products are built on intentional structure. We turn complex business workflows
            into clean, intuitive digital experiences that feel effortless for your users to navigate.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=UI/UX%20Design"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Start Design Project</span>
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
            The Cost of Confusing Interfaces
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            Aesthetic decoration without logical usability creates high drop-off rates, user frustration, and excessive support
            inquiries. If users cannot instantly understand where to go or what to do next, features remain unused. At ZOVO, our
            approach combines user psychology with clean design systems, ensuring visual beauty always serves practical clarity.
          </p>
        </div>
      </section>

      {/* Pillars & Deliverables */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Eye size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Visual Hierarchy</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Calculated typography scales, contrast ratios, and spacing that guide the eye naturally toward primary actions.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Grid size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Information Architecture</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Intuitive layout organization turning dense data and complex multi-step workflows into manageable, readable screens.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Component size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Scalable Design Tokens</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Standardized component systems in Figma and code that maintain visual coherence as your platform grows.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our Design Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A collaborative and iterative workflow ensuring product alignment before code is written:
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
