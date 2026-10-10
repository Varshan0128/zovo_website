'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { PortfolioApplicationForm } from '@/components/portfolio/PortfolioApplicationForm';
import { SlideUp, FadeIn } from '@/components/ui/Motion';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Film,
  Code2,
  Palette,
  Briefcase,
  Layers,
  Globe,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const episodes = [
  {
    number: 'EPISODE 01',
    tag: 'THE FOUNDATION',
    title: 'Career Narrative & Strategic Positioning',
    shortDesc: 'Deconstructing your career milestones to tell an undeniable story of technical impact.',
    fullDesc:
      'Most resumes and portfolios fail because they list passive tasks instead of strategic ownership. In this episode, our editorial strategists extract your quantifiable metrics, leadership moments, and technical architecture decisions to formulate an authoritative executive bio and narrative.',
    deliverables: [
      'Strategic value proposition & brand positioning',
      'Quantifiable career milestone synthesis',
      'Hero statement engineered for recruiters & clients',
    ],
    icon: Briefcase,
    color: '#1F5BFF',
  },
  {
    number: 'EPISODE 02',
    tag: 'VISUAL ARCHITECTURE',
    title: 'Bespoke UI/UX & Motion Dynamics',
    shortDesc: 'Moving past cookie-cutter templates with tailored design tokens, micro-interactions, and precision typography.',
    fullDesc:
      'We design an interface that immediately looks and feels like a senior professional crafted it. Incorporating dark/light mode balance, Swiss grid discipline, subtle spring animations, and sleek responsive layout cards.',
    deliverables: [
      'Custom Figma design system & responsive tokens',
      'Subtle Framer Motion micro-animations',
      'Fast 60fps mobile and desktop navigation',
    ],
    icon: Palette,
    color: '#FF6B3D',
  },
  {
    number: 'EPISODE 03',
    tag: 'PROOF OF WORK',
    title: 'Interactive Case Studies & Deep Dives',
    shortDesc: 'Turning past projects into rich architectural walkthroughs with live sandboxes and verified outcomes.',
    fullDesc:
      'Hiring executives want to see how you solve problems under constraints. Each featured project is turned into an interactive case study with problem statements, architectural tradeoffs, technology stack badges, and live demonstration links.',
    deliverables: [
      'Interactive project breakdown cards',
      'Architecture diagrams & code highlight blocks',
      'Live sandbox / GitHub repository synchronization',
    ],
    icon: Code2,
    color: '#1F5BFF',
  },
  {
    number: 'EPISODE 04',
    tag: 'SCREENING BYPASS',
    title: 'ATS-Synchronized Resume Suite',
    shortDesc: 'A matching executive PDF resume that glides through automated applicant tracking bots with 100% fidelity.',
    fullDesc:
      'Your digital portfolio is paired with a matching, ATS-formatted resume document. Machine-readable heading hierarchies and semantic keyword optimization ensure you never get filtered out by enterprise HR parsing tools.',
    deliverables: [
      'ATS-tested, clean PDF resume export',
      'Synchronized copy with your web portfolio',
      'Instant one-click downloadable asset on your site',
    ],
    icon: FileText,
    color: '#10B981',
  },
  {
    number: 'EPISODE 05',
    tag: 'GLOBAL REACH',
    title: 'Global Edge CDN, Domain & Search Engine SEO',
    shortDesc: 'Lightning-fast sub-second global load times with custom domain DNS and rich social share previews.',
    fullDesc:
      'We configure your personal domain (e.g., yourname.dev or yourname.com) on edge servers with automated SSL certificates, Google SEO rich snippet structured data, and custom OpenGraph preview cards for LinkedIn and X.',
    deliverables: [
      'Custom domain DNS & SSL configuration',
      'Edge CDN caching (< 400ms load time globally)',
      'Rich OpenGraph cards for LinkedIn & WhatsApp previews',
    ],
    icon: Globe,
    color: '#8B5CF6',
  },
  {
    number: 'EPISODE 06',
    tag: 'CONVERSION & PIPELINE',
    title: 'Direct Sheet-Synced Lead & Opportunity Engine',
    shortDesc: 'Inbound contact pipelines that instantly append inquiries to your spreadsheet and alert you via WhatsApp.',
    fullDesc:
      'Turn visitors into clients or job offers. We wire direct inquiry forms that instantly log leads to your Google Sheets or Notion database, with optional Calendly booking embeds and instant WhatsApp direct contact.',
    deliverables: [
      'Automated Google Sheets & CSV enquiry piping',
      'Instant email & WhatsApp notification triggers',
      'Consultation & interview scheduling embeds',
    ],
    icon: FileSpreadsheet,
    color: '#25D366',
  },
];

const whoItsFor = [
  {
    title: 'Senior & Staff Engineers',
    desc: 'Showcase system design, architectural impact, distributed scaling, and open-source contributions.',
    badge: 'ENGINEERING',
  },
  {
    title: 'UI/UX & Product Designers',
    desc: 'Display high-fidelity prototypes, user research artifacts, design systems, and measured business impact.',
    badge: 'PRODUCT DESIGN',
  },
  {
    title: 'Founders & Independent Consultants',
    desc: 'Position your specialized advisory services, track record, client logos, and direct booking funnel.',
    badge: 'CONSULTING',
  },
  {
    title: 'Ambitious Career Changers',
    desc: 'Outshine competition with verified case studies and ATS-compliant resumes that capture hiring managers.',
    badge: 'CAREER ACCELERATION',
  },
];

export default function PortfolioUsersPage() {
  const [activeEpisode, setActiveEpisode] = useState(0);

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#1F5BFF] animate-pulse" />
                <span className="font-semibold text-[#14171F]">PORTFOLIO USER EXCLUSIVE</span>
                <span className="text-[#CBD5E1]">•</span>
                <span>EPISODIC SERVICE WALKTHROUGH</span>
              </div>
            </FadeIn>

            <SlideUp delay={0.2} distance={20}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
                Crafted Portfolios That{' '}
                <span className="text-[#1F5BFF] relative inline-block">
                  Accelerate Your Career
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#FF6B3D] rounded-full" />
                </span>
                <span className="text-[#FF6B3D]">.</span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.3} distance={20}>
              <p className="text-lg sm:text-xl text-[#5A6578] max-w-2xl leading-relaxed font-normal">
                Engineered specifically for software developers, designers, consultants, and leaders who demand
                a personal web platform that turns past experience into executive-level inbound opportunities.
              </p>
            </SlideUp>

            <SlideUp delay={0.4} distance={20}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Request Your Portfolio (Fill Form)</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="#episodes"
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-6 py-3.5 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] hover:-translate-y-0.5 transition-all"
                >
                  <Play size={14} className="text-[#1F5BFF] fill-[#1F5BFF]" />
                  <span>Explore Service Episodes</span>
                </a>
              </div>
            </SlideUp>

            {/* Quick KPI stats */}
            <FadeIn delay={0.5}>
              <div className="pt-8 border-t border-[#E2E6EF] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
                <div>
                  <div className="text-2xl font-bold text-[#14171F] font-mono">&lt; 0.4s</div>
                  <div className="text-xs text-[#5A6578] mt-0.5">Global Edge Load Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1F5BFF] font-mono">100%</div>
                  <div className="text-xs text-[#5A6578] mt-0.5">ATS Scanner Compliance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#14171F] font-mono">Bespoke</div>
                  <div className="text-xs text-[#5A6578] mt-0.5">Zero Generic Templates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#FF6B3D] font-mono">Direct</div>
                  <div className="text-xs text-[#5A6578] mt-0.5">Auto-Synced to Sheet</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 bg-[#F4F6FA] border-b border-[#E2E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F5BFF]">
              DESIGNED FOR HIGH-IMPACT PROFESSIONALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">
              Who This Dedicated Service is Built For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoItsFor.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-6 space-y-3 shadow-xs hover:border-[#1F5BFF] hover:-translate-y-1 transition-all duration-200"
              >
                <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F4F6FA] text-[10px] font-mono font-semibold text-[#5A6578] tracking-wider">
                  {item.badge}
                </span>
                <h3 className="text-base font-bold text-[#14171F]">{item.title}</h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section id="episodes" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E2E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-xs font-mono font-semibold uppercase tracking-wider text-[#1F5BFF]">
              <Film size={13} />
              <span>THE PORTFOLIO EPISODES SERIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
              How ZOVO Builds Your Portfolio: Episode by Episode
            </h2>
            <p className="text-base text-[#5A6578] leading-relaxed">
              Explore the exact multi-episode methodology we use to craft, code, verify, and launch your high-converting portfolio website.
            </p>
          </div>

          {/* Interactive Episode Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Episode List Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              {episodes.map((ep, idx) => {
                const isSelected = activeEpisode === idx;
                const Icon = ep.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveEpisode(idx)}
                    className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#1F5BFF] shadow-[0_8px_24px_rgba(31,91,255,0.08)] ring-1 ring-[#1F5BFF]'
                        : 'bg-[#F4F6FA]/70 border-[#E2E6EF] hover:bg-[#FFFFFF] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-[8px] shrink-0 transition-colors ${
                        isSelected ? 'bg-[#1F5BFF] text-white' : 'bg-[#FFFFFF] text-[#5A6578] border border-[#E2E6EF]'
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-[#1F5BFF]">
                          {ep.number}
                        </span>
                        <span className="text-[10px] font-mono text-[#8E97A8] uppercase tracking-wider">
                          {ep.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#14171F] mt-0.5 truncate">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-[#5A6578] mt-1 line-clamp-1">{ep.shortDesc}</p>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`shrink-0 mt-3 transition-transform ${
                        isSelected ? 'text-[#1F5BFF] translate-x-1' : 'text-[#CBD5E1] group-hover:text-[#5A6578]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Episode Deep-Dive Card */}
            <div className="lg:col-span-7">
              {(() => {
                const ep = episodes[activeEpisode];
                const Icon = ep.icon;

                return (
                  <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 sm:p-10 shadow-[0_16px_40px_rgba(20,23,31,0.06)] space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E2E6EF]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1F5BFF] border border-blue-200">
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-[#1F5BFF] tracking-wider block">
                            {ep.number} • {ep.tag}
                          </span>
                          <h3 className="text-2xl font-bold text-[#14171F] tracking-tight">{ep.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-[#5A6578] font-semibold">
                        Episode Overview & Strategy
                      </h5>
                      <p className="text-sm text-[#5A6578] leading-relaxed font-normal">{ep.fullDesc}</p>
                    </div>

                    {/* Key Deliverables in this Episode */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-[#14171F] font-semibold">
                        What Gets Delivered in this Episode:
                      </h5>
                      <div className="space-y-2.5">
                        {ep.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-[#F4F6FA] border border-[#E2E6EF] text-xs font-medium text-[#14171F]"
                          >
                            <CheckCircle2 size={16} className="text-[#1F5BFF] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Link to Form */}
                    <div className="pt-4 border-t border-[#E2E6EF] flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-[#5A6578]">
                        Ready to begin your portfolio journey?
                      </span>
                      <a
                        href="#apply"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5BFF] hover:underline"
                      >
                        <span>Jump to Application Form</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 md:py-28 bg-[#F4F6FA] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#FFFFFF] border border-[#E2E6EF] text-xs font-mono font-semibold uppercase tracking-wider text-[#1F5BFF]">
              <FileSpreadsheet size={13} className="text-emerald-600" />
              <span>SHEET RECORDED INTAKE FORM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
              Apply for Your Custom Portfolio
            </h2>
            <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed">
              Submit your information below. All entries are automatically written to our client spreadsheet and reviewed by our lead developers.
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl mx-auto">
            <PortfolioApplicationForm />
          </div>

          {/* Direct WhatsApp Consultation Backup */}
          <div className="mt-12 text-center text-xs text-[#5A6578] flex flex-wrap items-center justify-center gap-4">
            <span>Prefer a real-time conversation?</span>
            <a
              href="https://wa.me/917603865862?text=Hi%20ZOVO%2C%20I%20am%20interested%20in%20your%20Portfolio%20Service%20and%20would%20like%20to%20discuss%20pricing%20and%20timeline."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#14171F] hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon size={16} variant="color" />
              <span>Message ZOVO Studio on WhatsApp (+91 7603865862)</span>
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
