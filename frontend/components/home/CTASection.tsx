'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { SlideUp } from '@/components/ui/Motion';

export const CTASection: React.FC = () => {
  const companyEmail = 'contactzovo@gmail.com';
  const whatsappNumber = '+91 7603865862';
  const cleanNumber = '917603865862';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hi ZOVO, I would like to discuss a digital project.'
  )}`;

  return (
    <section className="py-24 md:py-32 bg-[#F4F6FA] border-b border-[#E2E6EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-10 md:p-16 text-center shadow-[0_12px_40px_rgba(20,23,31,0.04)] relative">
          <div className="max-w-3xl mx-auto space-y-6">
            <SlideUp>
              <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
                READY TO BUILD
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14171F] tracking-tight leading-tight mt-3">
                Have something in mind<span className="text-[#FF6B3D]">?</span>
              </h2>
            </SlideUp>

            <SlideUp delay={0.1}>
              <p className="text-base sm:text-lg text-[#5A6578] max-w-2xl mx-auto leading-relaxed font-normal">
                Tell us what you're trying to build. Let's figure out the right way forward.
              </p>
            </SlideUp>

            {/* Action Buttons */}
            <SlideUp delay={0.2}>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  onClick={() => analytics.trackEvent('contact_cta_click', { location: 'cta_section' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackEvent('whatsapp_click', { location: 'cta_section' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-6 py-3.5 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={16} className="text-[#25D366]" />
                  <span>WhatsApp ZOVO</span>
                </a>
              </div>
            </SlideUp>

            {/* Direct Channel Details */}
            <SlideUp delay={0.3}>
              <div className="pt-8 border-t border-[#E2E6EF] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#5A6578]">
                <a href={`mailto:${companyEmail}`} className="inline-flex items-center gap-2 hover:text-[#1F5BFF] transition-colors">
                  <Mail size={14} className="text-[#1F5BFF]" />
                  <span>{companyEmail}</span>
                </a>
                <span className="hidden sm:inline text-[#CBD5E1]">•</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>{whatsappNumber}</span>
                </a>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
};
