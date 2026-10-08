import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { Home, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found — ZOVO',
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="pt-36 pb-24 md:pt-44 md:pb-32 bg-[#F4F6FA] min-h-[75vh] flex items-center justify-center text-center border-b border-[#E2E6EF]">
        <div className="max-w-md mx-auto px-4 space-y-6">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-10 sm:p-12 shadow-[0_12px_36px_rgba(20,23,31,0.04)] space-y-6">
            <div className="font-mono text-7xl font-extrabold text-[#1F5BFF]">404</div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#14171F]">Page Not Found<span className="text-[#FF6B3D]">.</span></h1>
              <p className="text-sm text-[#5A6578] leading-relaxed">
                The page you are looking for doesn't exist or has been moved to a new destination.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] transition-colors"
              >
                <Home size={15} />
                <span>Return Home</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-white border border-[#14171F] px-5 py-3 text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
              >
                <span>Services</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
