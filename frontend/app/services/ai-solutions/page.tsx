import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Brain,
  Database,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Practical AI That Solves Actual Business Problems — AI Solutions | ZOVO',
  description:
    'Integrating intelligent capabilities into existing products and workflows. No hype, just pragmatic utility engineered for accuracy, security, and speed.',
};

const deliverables = [
  'Custom LLM integrations & API middleware',
  'Conversational AI assistants & intelligent agents',
  'Document parsing & automated data extraction',
  'Semantic search & vector database indexing',
  'Automated classification & summarization pipelines',
  'Input validation & safety guardrails',
  'Observability, telemetry & token cost tracking',
];

const processPhases = [
  { step: '01', title: 'Feasibility Review', desc: 'Evaluating business goals, data readiness, accuracy requirements, and latency targets.' },
  { step: '02', title: 'Data Architecture', desc: 'Structuring document parsing, vector indexing, and isolated data flow boundaries.' },
  { step: '03', title: 'Prompt & Schema Design', desc: 'Crafting robust system prompts, structured JSON output formats, and deterministic rules.' },
  { step: '04', title: 'Backend Integration', desc: 'Engineering resilient FastAPI endpoints connecting AI models to your core database.' },
  { step: '05', title: 'Safety & Guardrails', desc: 'Implementing hallucination defenses, prompt-injection filters, and graceful fallbacks.' },
  { step: '06', title: 'Deployment & Telemetry', desc: 'Rolling out production endpoints with rate limiting, logging, and latency monitoring.' },
  { step: '07', title: 'Cost Optimization', desc: 'Auditing token usage, caching repeat queries, and tuning model parameters for maximum ROI.' },
];

export default function AiSolutionsPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <Sparkles size={13} className="text-[#1F5BFF]" />
            <span>AI SOLUTIONS & AGENTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Practical AI That Solves Actual Business Problems<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            Harness the power of AI without unnecessary complexity. We engineer secure, pragmatic
            artificial intelligence integrations that automate data processing, assist customers, and unlock operational speed.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=AI%20Solutions"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Discuss AI Requirements</span>
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
            The Gap Between AI Hype & Production Value
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            Generic AI demos look impressive in isolation, but quickly fail in production due to hallucinations, unpredictable costs,
            slow response times, and confidential data leakage. Businesses do not need generic novelty; they need dependable data extraction,
            accurate answers grounded in their proprietary knowledge, and predictable operating costs. We build robust, verifiable AI pipelines
            that integrate directly into your existing operational stack.
          </p>
        </div>
      </section>

      {/* Pillars & Deliverables */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Brain size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Grounded Knowledge (RAG)</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Connect LLMs directly to your internal documents, manuals, and records with verifiable source citations and zero hallucination.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Database size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Vector Search Engines</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                High-speed semantic search indexing catalogs, tickets, or policy documents for sub-second retrieval accuracy.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Privacy & Guardrails</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Zero training on confidential client data, strict prompt safety filters, API key isolation, and predictable quotas.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our AI Engineering Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A rigorous, validation-focused methodology ensuring safety and precision in production:
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
