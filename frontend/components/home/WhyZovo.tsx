'use client';

import React from 'react';
import { SlideUp } from '@/components/ui/Motion';

const principles = [
  {
    step: '01',
    title: 'Understand',
    lead: 'Diagnose Before Prescribing',
    description:
      'We unpack your actual problem, operational bottlenecks, and user workflows before recommending architecture or technology.',
  },
  {
    step: '02',
    title: 'Design',
    lead: 'Clarity Over Decoration',
    description:
      'Every screen, component, and interaction is engineered for rapid human comprehension and straightforward task completion.',
  },
  {
    step: '03',
    title: 'Build',
    lead: 'Clean, Resilient Engineering',
    description:
      'We develop modern full-stack systems with type safety, minimal dependencies, fast loading times, and verified security standards.',
  },
  {
    step: '04',
    title: 'Evolve',
    lead: 'Architectures That Grow',
    description:
      'We hand over clean, documented code and scalable database structures built to adapt without costly rewrites as your business scales.',
  },
];

export const WhyZovo: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F4F6FA] border-b border-[#E2E6EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
            THE ZOVO METHOD
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14171F] tracking-tight leading-[1.12]">
            Built around the problem,<br className="hidden sm:block" />
            not the template<span className="text-[#FF6B3D]">.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed">
            Generic themes and off-the-shelf templates force your business into rigid compromises.
            We engineer bespoke digital solutions that fit your specific reality.
          </p>
        </div>

        {/* Four Principles Editorial Grid with SEAM Connection Line */}
        <div className="relative">
          {/* Top Connecting SEAM Line on Desktop */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-[2px] bg-[#E2E6EF]">
            <div className="h-full w-24 bg-[#FF6B3D] ml-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {principles.map((item, index) => (
              <SlideUp key={item.step} delay={index * 0.08} distance={15}>
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E6EF] p-7 flex flex-col justify-between h-full shadow-[0_4px_16px_rgba(20,23,31,0.03)] hover:border-[#1F5BFF]/40 transition-colors duration-200">
                  <div className="space-y-4">
                    {/* Number Badge with SEAM Node */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#1F5BFF] tracking-wider">
                        {item.step}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#FF6B3D]" />
                    </div>

                    <h3 className="text-xl font-bold text-[#14171F] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono uppercase tracking-wider text-[#1F5BFF] font-semibold">
                      {item.lead}
                    </p>

                    <p className="text-sm text-[#5A6578] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
