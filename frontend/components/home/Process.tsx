'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SlideUp } from '@/components/ui/Motion';

const steps = [
  {
    num: '01',
    name: 'DISCOVER',
    title: 'Discovery & Scope',
    desc: 'Unpacking requirements, target audience expectations, and measurable success criteria.',
  },
  {
    num: '02',
    name: 'PLAN',
    title: 'Architecture & Spec',
    desc: 'Defining tech stack, data models, wireframes, and delivery milestones.',
  },
  {
    num: '03',
    name: 'DESIGN',
    title: 'UI & UX Systems',
    desc: 'Creating high-fidelity Figma components, interactive flows, and accessibility tokens.',
  },
  {
    num: '04',
    name: 'BUILD',
    title: 'Full-Stack Engineering',
    desc: 'Writing clean, typed code with API integrations and automated regression tests.',
  },
  {
    num: '05',
    name: 'LAUNCH',
    title: 'Deployment & Support',
    desc: 'Domain setup, cloud deployment, telemetry monitoring, and production handover.',
  },
];

export const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E2E6EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
            ENGINEERING ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14171F] tracking-tight">
            Predictable Execution<span className="text-[#FF6B3D]">.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed">
            A transparent 5-step delivery process that keeps everyone aligned from early scope to production launch.
          </p>
        </div>

        {/* Desktop Horizontal Process Timeline */}
        <div className="hidden lg:block relative pt-8 pb-4">
          {/* Progress Connecting Line */}
          <div className="absolute top-[49px] left-6 right-6 h-[2px] bg-[#E2E6EF] -z-0">
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-full w-full bg-gradient-to-r from-[#1F5BFF] via-[#1F5BFF] to-[#FF6B3D]"
            />
          </div>

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => (
              <SlideUp key={item.num} delay={idx * 0.1} distance={15}>
                <div className="space-y-4">
                  {/* Timeline Node Badge */}
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-[8px] bg-[#FFFFFF] border-2 border-[#1F5BFF] flex items-center justify-center font-mono text-xs font-bold text-[#1F5BFF] shadow-xs">
                      {item.num}
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-[#14171F] font-bold uppercase">
                      {item.name}
                    </span>
                  </div>

                  {/* Step Description */}
                  <div className="pt-2">
                    <h3 className="text-base font-bold text-[#14171F] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5A6578] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#1F5BFF]/30 space-y-10 ml-2">
          {steps.map((item) => (
            <div key={item.num} className="relative space-y-2">
              {/* Vertical Pin Node */}
              <div className="absolute -left-[31px] top-0 h-6 w-6 rounded-[6px] bg-[#FFFFFF] border-2 border-[#1F5BFF] flex items-center justify-center font-mono text-[10px] font-bold text-[#1F5BFF]">
                {item.num}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#FF6B3D] font-bold">
                  {item.name}
                </span>
                <span className="text-[#8E97A8]">/</span>
                <h3 className="text-sm font-bold text-[#14171F]">{item.title}</h3>
              </div>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
