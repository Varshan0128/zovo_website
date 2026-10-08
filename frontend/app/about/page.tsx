import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import { ZovoSeamGraphic } from '@/components/brand/ZovoSeamGraphic';
import { Compass, ShieldCheck, HeartHandshake, Code } from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Two Blocks, One Connection — About ZOVO',
  description:
    'ZOVO is a service-based digital solutions company. We help businesses, startups, creators, and individuals turn ideas into practical digital solutions.',
};

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
            <span>ABOUT ZOVO STUDIO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Two Blocks, One Connection<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] leading-relaxed max-w-2xl mx-auto font-normal">
            ZOVO is a service-based digital solutions company that helps businesses, startups, creators,
            and individuals turn ideas into practical digital solutions.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 md:py-28 bg-[#F4F6FA] border-b border-[#E2E6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Story Narrative */}
          <div className="space-y-6 text-base sm:text-lg text-[#14171F] leading-relaxed">
            <p>
              Every meaningful digital product starts with two separate realities that need to work together:
            </p>
            <div className="border-l-3 border-[#FF6B3D] pl-6 py-2 bg-[#FFFFFF] rounded-r-xl border-y border-r border-[#E2E6EF]">
              <p className="text-xl sm:text-2xl font-bold text-[#14171F] tracking-tight leading-snug">
                "Ideas are one block. Technology is another. ZOVO is the seam that connects them into something useful."
              </p>
            </div>
            <p className="text-[#5A6578] text-base leading-relaxed">
              We do not believe in forcing a business problem into a predetermined template or an overly
              complex framework. Instead, we examine the actual operational requirement, understand the
              end users, and engineer the appropriate digital solution—whether that is a modern web
              application, a native mobile product, practical AI automation, or clean UI/UX design.
            </p>
          </div>

          {/* The SEAM Brand Concept Block */}
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 p-3 rounded-xl bg-[#F4F6FA] border border-[#E2E6EF] w-20 h-20 relative flex items-center justify-center">
                <Image
                  src="/brand/icon.png"
                  alt="ZOVO SEAM Icon"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F5BFF]">
                  THE SEAM IDENTITY
                </div>
                <h3 className="text-2xl font-bold text-[#14171F]">
                  Connected Building Blocks
                </h3>
                <p className="text-sm text-[#5A6578] leading-relaxed">
                  The ZOVO identity is based on the SEAM concept—connected building blocks joined by a
                  Z-shaped seam. It reflects the philosophy that software should connect user intent to technical
                  execution with clarity, reliability, and precision.
                </p>
              </div>
            </div>
          </div>

          {/* How We Work Principles */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] text-center md:text-left">
              Our Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                  <Compass size={18} />
                </div>
                <h3 className="text-base font-bold text-[#14171F]">Built Around Your Needs</h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">
                  We start with your specific problem, not a predefined package. Every solution is shaped
                  around real constraints and actual user workflows.
                </p>
              </div>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                  <Code size={18} />
                </div>
                <h3 className="text-base font-bold text-[#14171F]">Design + Technology</h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">
                  Thoughtful user experience combined with solid, modern engineering. Interfaces are clean,
                  and codebases are built to perform reliably.
                </p>
              </div>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-base font-bold text-[#14171F]">Clear Communication</h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">
                  You know what is being built, why it matters, and what comes next. We keep technical
                  discussions direct and transparent.
                </p>
              </div>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                  <HeartHandshake size={18} />
                </div>
                <h3 className="text-base font-bold text-[#14171F]">Built to Evolve</h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">
                  Solutions are designed with clean architectures so they can adapt and grow alongside your
                  business goals over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
