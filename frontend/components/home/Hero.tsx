'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { ZovoSeamGraphic } from '@/components/brand/ZovoSeamGraphic';
import { FadeIn, SlideUp } from '@/components/ui/Motion';
import { analytics } from '@/lib/analytics';

export const Hero: React.FC = () => {
  const handlePrimaryClick = () => {
    analytics.trackEvent('hero_primary_cta_click');
  };

  const handleSecondaryClick = () => {
    analytics.trackEvent('hero_secondary_cta_click');
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] overflow-hidden border-b border-[#E2E6EF]">
      {/* Precision Swiss background grid */}
      <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
                <span>DIGITAL SERVICES STUDIO</span>
              </div>
            </FadeIn>

            <SlideUp delay={0.2} distance={20}>
              <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-bold text-[#14171F] leading-[1.06] tracking-tight">
                Turning Ideas <br className="hidden sm:block" />
                Into{' '}
                <span className="relative inline-block text-[#1F5BFF]">
                  Digital Solutions
                  <span className="absolute left-0 -bottom-1.5 w-full h-[3px] bg-[#FF6B3D] rounded-full" />
                </span>
                <span className="text-[#FF6B3D]">.</span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.3} distance={20}>
              <p className="text-lg sm:text-xl text-[#5A6578] max-w-2xl leading-relaxed font-normal">
                We design and build websites, apps and digital solutions that help ideas move forward.
              </p>
            </SlideUp>

            {/* CTAs with 8px agency border-radius */}
            <SlideUp delay={0.4} distance={20}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  onClick={handlePrimaryClick}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/services"
                  onClick={handleSecondaryClick}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white border border-[#14171F] px-6 py-3.5 text-sm font-medium text-[#14171F] hover:bg-[#F4F6FA] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Explore Services</span>
                  <ArrowDownRight size={15} className="text-[#5A6578]" />
                </Link>
              </div>
            </SlideUp>

            {/* Swiss Precision Discipline Triad */}
            <FadeIn delay={0.5}>
              <div className="pt-8 border-t border-[#E2E6EF] grid grid-cols-3 gap-4 max-w-xl">
                <div>
                  <span className="block font-mono text-[11px] text-[#5A6578] uppercase tracking-wider">01 / BUILD</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#14171F] mt-0.5 block">Full-Stack Tech</span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[#5A6578] uppercase tracking-wider">02 / CRAFT</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#14171F] mt-0.5 block">Product & UX</span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[#5A6578] uppercase tracking-wider">03 / REAL</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#14171F] mt-0.5 block">Zero Fluff</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Architectural SEAM Geometry */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn delay={0.3}>
              <ZovoSeamGraphic />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
