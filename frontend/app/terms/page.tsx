import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: 'Terms of Service — ZOVO',
  description: 'ZOVO Terms of Service governing platform usage and service contracts.',
};

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 pb-8 border-b border-[#E2E6EF]">
            <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
              LEGAL DOCUMENTATION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14171F]">
              Terms of Service<span className="text-[#FF6B3D]">.</span>
            </h1>
            <p className="text-sm text-[#5A6578] font-mono">Effective Date: January 1, 2026</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-[#14171F] leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">1. Agreement to Terms</h2>
              <p className="text-[#5A6578]">
                By accessing this website and utilizing our digital service consultation channels, you
                agree to be bound by these Terms of Service. If you disagree with any portion of these
                terms, please discontinue use of this site.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">2. Digital Services & Scope</h2>
              <p className="text-[#5A6578]">
                ZOVO provides custom software engineering, website development, mobile application
                creation, UI/UX design, AI solutions, business automation, and career portfolio creation.
                All development contracts, deliverables, milestones, and payment schedules are governed
                by distinct Master Service Agreements (MSAs) or Statements of Work (SOWs) executed
                between ZOVO and the client.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">3. Intellectual Property</h2>
              <p className="text-[#5A6578]">
                Upon receipt of full payment under an executed Statement of Work, all custom code, assets,
                and intellectual property developed explicitly for the client are assigned to the client,
                subject to any pre-existing open-source licenses and frameworks used in the build.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">4. Inquiries & Communication</h2>
              <p className="text-[#5A6578]">
                Submitting an enquiry through our contact form does not create a binding development
                contract. It serves as an invitation to discuss requirements, feasibility, and project terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
