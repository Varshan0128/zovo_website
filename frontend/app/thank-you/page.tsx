'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { CheckCircle2, Home, MessageCircle } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [referenceId, setReferenceId] = useState<string>('ZOVO-SUBMIT');

  useEffect(() => {
    const queryId = searchParams.get('id');
    const storedId = typeof window !== 'undefined' ? sessionStorage.getItem('zovo_enquiry_id') : null;
    const rawId = queryId || storedId;

    if (rawId) {
      if (rawId.startsWith('ZOVO-')) {
        setReferenceId(rawId);
      } else {
        setReferenceId(`ZOVO-${rawId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()}`);
      }
    }
  }, [searchParams]);

  const whatsappUrl =
    'https://wa.me/917603865862?text=' +
    encodeURIComponent(`Hi ZOVO, I would like to discuss my project enquiry (${referenceId}).`);

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32 bg-[#F4F6FA] min-h-[80vh] flex items-center justify-center relative overflow-hidden border-b border-[#E2E6EF]">
      <div className="max-w-xl mx-auto px-4 text-center relative z-10 space-y-8">
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 sm:p-12 shadow-[0_12px_36px_rgba(20,23,31,0.04)] space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171F]">
              Thanks for reaching out<span className="text-[#FF6B3D]">.</span>
            </h1>
            <p className="text-base text-[#5A6578] leading-relaxed">
              Your enquiry has been received. We'll review the details and get back to you with a practical next step.
            </p>

            <div className="inline-block rounded-xl bg-[#F4F6FA] border border-[#E2E6EF] px-6 py-3 mt-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6578] block font-semibold mb-0.5">
                Enquiry Reference
              </span>
              <span className="font-mono text-base font-bold text-[#1F5BFF]">
                {referenceId}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-white border border-[#14171F] px-6 py-3 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
            >
              <Home size={15} />
              <span>Back to Home</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[#20ba59] transition-colors"
            >
              <MessageCircle size={15} />
              <span>WhatsApp ZOVO</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ThankYouPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="min-h-screen bg-[#F4F6FA]" />}>
        <ThankYouContent />
      </Suspense>
    </SiteShell>
  );
}
