import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Cpu,
  WifiOff,
  BellRing,
  HelpCircle,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Mobile Apps That Put Users First — Mobile Applications | ZOVO',
  description:
    'Native and cross-platform mobile applications engineered with React Native. Fast, responsive, and crafted for real-world reliability.',
};

const deliverables = [
  'Cross-platform iOS & Android apps',
  'Startup MVP mobile applications',
  'Web platform companion apps',
  'Secure API & token authentication',
  'Offline-first data synchronization',
  'Push notifications & background tasks',
  'App Store & Play Store deployment',
];

const processPhases = [
  { step: '01', title: 'Concept & Discovery', desc: 'Mapping user journeys, device requirements, and core offline needs.' },
  { step: '02', title: 'UX & Navigation Flows', desc: 'Prototyping fluid gestures, tactile interactions, and screen transitions.' },
  { step: '03', title: 'Interface Design', desc: 'Crafting responsive layouts tailored to iOS Human Interface and Material design.' },
  { step: '04', title: 'Mobile Engineering', desc: 'Writing performant, modular code with native device API integrations.' },
  { step: '05', title: 'Device Testing & QA', desc: 'Rigorous testing on physical handsets, latency checks, and battery profiling.' },
  { step: '06', title: 'Store Submissions', desc: 'Preparing privacy manifests, app store listings, signing certificates, and launch.' },
  { step: '07', title: 'Ongoing Updates', desc: 'Monitoring crash reports, analytics, and adapting to new iOS and Android OS releases.' },
];

export default function MobileAppsPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <Smartphone size={13} className="text-[#1F5BFF]" />
            <span>MOBILE ENGINEERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Mobile Apps That Put Users First<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            Build mobile apps that feel fluid, responsive, and natural. We engineer Android and iOS
            solutions designed for 60fps performance, offline resilience, and intuitive user experiences.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=Mobile%20Apps"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Start Mobile Project</span>
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
            The Performance & Fragmentation Barrier
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            Sluggish transitions, battery drain, and unhandled offline states cause users to abandon mobile apps within seconds.
            Many cross-platform builds suffer from bloated runtimes and clunky native bridges. We focus on lightweight architectures,
            native gestures, intelligent background syncing, and battle-tested device compatibility across varying screen sizes.
          </p>
        </div>
      </section>

      {/* Pillars & Deliverables */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Cpu size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Cross-Platform Speed</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Shared modern codebases delivering native rendering speed across iOS and Android without duplicated engineering overhead.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <WifiOff size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Offline Synchronization</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Local-first caching allowing critical app flows to function flawlessly even without an active data connection.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <BellRing size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Push & Event Routing</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                High-deliverability push notification workflows, background sync triggers, and biometric login authentication.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our Mobile Engineering Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A structured path from initial user flows to verified App Store and Play Store releases:
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
