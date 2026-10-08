'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ZovoSeamGraphic } from '@/components/brand/ZovoSeamGraphic';
import { SlideUp } from '@/components/ui/Motion';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E2E6EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual SEAM Element */}
          <div className="lg:col-span-5 flex justify-center">
            <SlideUp distance={20}>
              <ZovoSeamGraphic />
            </SlideUp>
          </div>

          {/* Right Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <SlideUp distance={20} delay={0.1}>
              <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08] mt-3">
                Two blocks.<br />
                <span className="text-[#FF6B3D]">One connection.</span>
              </h2>
            </SlideUp>

            <SlideUp distance={20} delay={0.2}>
              <p className="text-xl sm:text-2xl text-[#14171F] font-semibold leading-relaxed">
                ZOVO connects ideas and technology to create digital solutions that are useful, thoughtful and built to evolve.
              </p>
            </SlideUp>

            <SlideUp distance={20} delay={0.3}>
              <p className="text-base text-[#5A6578] leading-relaxed font-normal">
                Ideas are one block. Technology is another. On their own, ideas stay theoretical, and technology remains empty syntax. ZOVO is the seam that joins them into dependable, living systems designed for actual people.
              </p>
            </SlideUp>

            <SlideUp distance={20} delay={0.4}>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-[8px] bg-white border border-[#14171F] px-6 py-3 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] hover:-translate-y-0.5 transition-all shadow-xs"
                >
                  <span>Read our story</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
};
