'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

const services = [
  {
    num: '01',
    title: 'Web Development',
    slug: 'web-development',
    desc: 'Websites and web applications built around your business.',
    deliverables: ['Responsive Web', 'Full-Stack Apps', 'Admin Dashboards', 'API Integrations'],
  },
  {
    num: '02',
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    desc: 'Thoughtful mobile experiences for real users.',
    deliverables: ['iOS & Android', 'React Native', 'Offline-First Data', 'Push Pipelines'],
  },
  {
    num: '03',
    title: 'UI / UX Design',
    slug: 'ui-ux',
    desc: 'Interfaces that are clear, useful and memorable.',
    deliverables: ['Design Systems', 'Interactive Prototypes', 'Wireframes', 'WCAG AA Accessibility'],
  },
  {
    num: '04',
    title: 'AI Solutions',
    slug: 'ai-solutions',
    desc: 'Practical AI systems built around real workflows.',
    deliverables: ['Custom LLM Pipelines', 'RAG & Vector Search', 'Document Extraction', 'Safety Guardrails'],
  },
  {
    num: '05',
    title: 'Business Automation',
    slug: 'automation',
    desc: 'Connect repetitive processes and reduce manual work.',
    deliverables: ['Webhook Handlers', 'CRM Synchronization', 'Data Routing', 'Automated Alerts'],
  },
  {
    num: '06',
    title: 'Digital Career Solutions',
    slug: 'resume-portfolio',
    desc: 'Professional resume and portfolio experiences.',
    deliverables: ['Portfolio Websites', 'Executive Resumes', 'ATS-Optimized Formatting', 'Custom Domains'],
  },
];

export const ServicesGrid: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E2E6EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E2E6EF] gap-6">
          <div className="space-y-3">
            <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
              WHAT WE BUILD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14171F] tracking-tight">
              Services Engineered for Execution<span className="text-[#FF6B3D]">.</span>
            </h2>
          </div>
          <p className="text-base text-[#5A6578] max-w-md font-normal leading-relaxed">
            Practical digital engineering designed to solve real operational needs without technical debt or unnecessary complexity.
          </p>
        </div>

        {/* Structured Editorial Vertical List */}
        <div className="divide-y divide-[#E2E6EF] border-b border-[#E2E6EF]">
          {services.map((item, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <SlideUp key={item.slug} delay={index * 0.05} distance={15}>
                <Link
                  href={`/services/${item.slug}`}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative block py-8 md:py-10 px-4 sm:px-6 transition-all duration-200 ${
                    isHovered ? 'bg-[#F4F6FA]' : 'bg-transparent'
                  }`}
                >
                  {/* Signature Coral Seam Notch Indicator on Hover */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B3D] transition-transform duration-200 origin-top ${
                      isHovered ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span
                        className={`font-mono text-base font-semibold tracking-wider transition-colors duration-200 ${
                          isHovered ? 'text-[#1F5BFF]' : 'text-[#8E97A8]'
                        }`}
                      >
                        {item.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-4">
                      <h3
                        className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-200 ${
                          isHovered ? 'text-[#1F5BFF]' : 'text-[#14171F]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-4">
                      <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                      {/* Micro deliverables pill tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.deliverables.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-white border border-[#E2E6EF] text-[#5A6578]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Action */}
                    <div className="md:col-span-3 flex items-center md:justify-end gap-2 text-sm font-semibold text-[#14171F] group-hover:text-[#1F5BFF] transition-colors">
                      <span className="text-xs uppercase font-mono tracking-wider">Explore</span>
                      <div className="h-9 w-9 rounded-[8px] bg-white border border-[#E2E6EF] group-hover:border-[#1F5BFF] flex items-center justify-center transition-all duration-200 group-hover:translate-x-1.5 shadow-xs">
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              </SlideUp>
            );
          })}
        </div>

        {/* All Services Direct Link */}
        <div className="pt-10 flex justify-between items-center text-sm font-mono text-[#5A6578]">
          <span>06 CORE CAPABILITIES</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F5BFF] hover:underline"
          >
            <span>View detailed capability breakdown</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};
