import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Radio,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

export const metadata: Metadata = {
  title: 'Automate Repetitive Work. Free Up Human Time. — Business Automation | ZOVO',
  description:
    'Stop losing hours to manual data entry. We engineer event-driven workflow automation pipelines, webhook systems, and third-party API bridges that run 24/7.',
};

const deliverables = [
  'Multi-app workflow automation (n8n, Make, custom scripts)',
  'CRM & lead routing pipelines (instant WhatsApp & email alerts)',
  'Payment & invoicing synchronization flows',
  'Database webhook handlers & bi-directional sync',
  'Automated reporting bots & CSV data consolidation',
  'Lightweight cloud functions & scheduled task runners',
  'Fail-safe retry mechanisms & alert notifications',
];

const processPhases = [
  { step: '01', title: 'Workflow Audit', desc: 'Analyzing repetitive manual tasks, software bottlenecks, and human handoffs.' },
  { step: '02', title: 'Architecture Mapping', desc: 'Designing triggers, payload transformations, conditional logic, and safety bounds.' },
  { step: '03', title: 'API & Webhook Setup', desc: 'Connecting authentication tokens, webhooks, and secure cloud endpoints.' },
  { step: '04', title: 'Logic & Deduplication', desc: 'Writing clean validation and transformation scripts to prevent duplicate executions.' },
  { step: '05', title: 'Edge-Case Stress Testing', desc: 'Simulating API timeouts, schema changes, and high-volume burst events.' },
  { step: '06', title: 'Production Rollout', desc: 'Activating live pipelines with monitoring listeners and dead-letter queues.' },
  { step: '07', title: 'Handover & Runbooks', desc: 'Documenting workflows and configuring real-time alert notifications for anomalies.' },
];

export default function AutomationPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <Zap size={13} className="text-[#1F5BFF]" />
            <span>BUSINESS AUTOMATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Automate Repetitive Work. Free Up Human Time<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5A6578] max-w-3xl leading-relaxed font-normal">
            Stop losing valuable hours to manual data entry and disconnected tools. We engineer
            event-driven automation pipelines, webhook architectures, and custom scripts that run reliably 24/7.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact?service=Automation"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
            >
              <span>Automate Your Workflows</span>
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
            The Hidden Cost of Fragmented Software
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-3xl font-normal">
            As businesses grow, manual copy-pasting between spreadsheets, CRMs, email clients, and payment gateways creates
            costly delays and human errors. Enquiries get lost, invoices are delayed, and valuable talent is spent on mechanical tasks.
            At ZOVO, we build seamless, automated data bridges that connect your software stack and eliminate operational friction completely.
          </p>
        </div>
      </section>

      {/* Pillars & Deliverables */}
      <section className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <Radio size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Real-Time Webhooks</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Instant triggers that execute the second a customer submits an enquiry, pays an invoice, or signs a contract.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <RefreshCw size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Data Synchronization</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Bi-directional sync between databases, accounting systems, and CRM pipelines with built-in deduplication guards.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 space-y-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF]">
                <CheckSquare size={18} />
              </div>
              <h3 className="text-base font-bold text-[#14171F]">Error Recovery & Alerts</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Automatic retry mechanisms, dead-letter logs, and instant notifications so workflow anomalies never pass unnoticed.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">Our Automation Process</h2>
              <p className="text-sm text-[#5A6578] mt-1">
                A dependable engineering roadmap from operational assessment to self-healing execution:
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
