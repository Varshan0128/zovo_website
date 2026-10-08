import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: 'Privacy Policy — ZOVO',
  description: 'ZOVO Privacy Policy and data handling practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 pb-8 border-b border-[#E2E6EF]">
            <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
              LEGAL DOCUMENTATION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14171F]">
              Privacy Policy<span className="text-[#FF6B3D]">.</span>
            </h1>
            <p className="text-sm text-[#5A6578] font-mono">Effective Date: January 1, 2026</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-[#14171F] leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">1. Information We Collect</h2>
              <p className="text-[#5A6578]">
                When you submit an enquiry through our contact form, we collect the information you
                choose to provide, including your full name, email address, phone number, company name,
                service requirements, budget, project timeline, and project description.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">2. How We Use Your Information</h2>
              <p className="text-[#5A6578]">We use the information we collect solely to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#5A6578]">
                <li>Respond to your project enquiry and communicate regarding potential engagements.</li>
                <li>Prepare technical blueprints, project scopes, and development estimates.</li>
                <li>Improve our service offerings and platform reliability.</li>
              </ul>
              <p className="text-[#5A6578]">We do not sell, rent, or trade your personal data to any third parties.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">3. Data Security & Storage</h2>
              <p className="text-[#5A6578]">
                All project submissions and contact records are stored securely in PostgreSQL databases
                with encrypted network connections and strict access controls. Administrative access
                is protected via authenticated bearer tokens and role-based permissions.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#14171F]">4. Contact Regarding Privacy</h2>
              <p className="text-[#5A6578]">
                If you have questions regarding your data or wish to request deletion of your enquiry record,
                please reach out directly to{' '}
                <a href="mailto:contactzovo@gmail.com" className="text-[#1F5BFF] underline font-medium">
                  contactzovo@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
