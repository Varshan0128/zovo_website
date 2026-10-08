'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
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
        className="group flex items-center gap-2.5 rounded-full bg-[#FFFFFF] border border-[#E2E6EF] px-3.5 py-2.5 text-[#14171F] shadow-[0_8px_24px_rgba(20,23,31,0.08)] hover:border-[#25D366] hover:-translate-y-0.5 transition-all duration-200"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs shrink-0">
          <MessageCircle size={15} />
        </span>
        <span className="hidden sm:inline text-xs font-semibold tracking-tight text-[#14171F]">
          WhatsApp
        </span>
      </a>
    </aside>
  );
};
