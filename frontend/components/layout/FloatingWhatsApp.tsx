'use client';

import React from 'react';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { analytics } from '@/lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const cleanNumber = '917603865862';
  const message = encodeURIComponent('Hi ZOVO, I would like to discuss a digital project.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  const handleClick = () => {
    analytics.trackEvent('whatsapp_click', { phone: cleanNumber });
  };

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with ZOVO on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#FFFFFF] border border-[#E2E6EF] px-3.5 py-2.5 text-[#14171F] shadow-[0_8px_24px_rgba(20,23,31,0.12)] hover:border-[#25D366] hover:shadow-[0_12px_28px_rgba(37,211,102,0.22)] hover:-translate-y-0.5 transition-all duration-200"
      >
        <span className="relative flex h-7.5 w-7.5 items-center justify-center shrink-0">
          <WhatsAppIcon size={28} variant="color" className="drop-shadow-xs transition-transform duration-200 group-hover:scale-110" />
        </span>
        <span className="hidden sm:inline text-xs font-semibold tracking-tight text-[#14171F] group-hover:text-[#25D366] transition-colors">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
