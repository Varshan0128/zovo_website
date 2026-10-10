import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { ContactForm } from '@/components/contact/ContactForm';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Have Something in Mind? — Contact ZOVO',
  description:
    "Tell us what you're trying to build. Let's figure out the right way forward.",
};

export default function ContactPage() {
  const companyEmail = 'contactzovo@gmail.com';
  const whatsappNumber = '+91 7603865862';
  const cleanNumber = '917603865862';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hi ZOVO, I would like to discuss a digital project.'
  )}`;

  return (
    <SiteShell>
      <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-[#F4F6FA] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#FFFFFF] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
                  <span>START A CONVERSATION</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
                  Have something in mind<span className="text-[#FF6B3D]">?</span>
                </h1>
                <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed">
                  Tell us what you're trying to build. Let's figure out the right way forward.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${companyEmail}`}
                  className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 flex items-center gap-4 hover:border-[#1F5BFF] hover:shadow-xs transition-all duration-200 group block"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#F4F6FA] text-[#1F5BFF] border border-[#E2E6EF] group-hover:bg-[#1F5BFF] group-hover:text-white transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#5A6578]">Direct Email</div>
                    <div className="text-sm font-semibold text-[#14171F] mt-0.5">{companyEmail}</div>
                  </div>
                  <ArrowRight size={14} className="text-[#CBD5E1] group-hover:text-[#1F5BFF] group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 flex items-center gap-4 hover:border-[#25D366] hover:shadow-xs transition-all duration-200 group block"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-emerald-50 border border-emerald-100 group-hover:bg-[#25D366]/10 transition-colors shrink-0">
                    <WhatsAppIcon size={24} variant="color" className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#5A6578]">WhatsApp Studio</div>
                    <div className="text-sm font-semibold text-[#14171F] mt-0.5">{whatsappNumber}</div>
                  </div>
                  <ArrowRight size={14} className="text-[#CBD5E1] group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* Principles & Assurances */}
              <div className="pt-6 border-t border-[#E2E6EF] space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-[#5A6578]">
                  <Clock size={16} className="text-[#1F5BFF] shrink-0" />
                  <span>We evaluate requirements and reply with a practical next step</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#5A6578]">
                  <ShieldCheck size={16} className="text-[#1F5BFF] shrink-0" />
                  <span>Strict confidentiality across all specifications and ideas</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
