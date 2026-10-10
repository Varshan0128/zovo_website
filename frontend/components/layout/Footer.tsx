'use client';

import React from 'react';
import Link from 'next/link';
import { ZovoLogo } from '@/components/brand/ZovoLogo';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { Mail, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const servicesLinks = [
  { name: 'Web Development', href: '/services/web-development' },
  { name: 'Mobile Apps', href: '/services/mobile-apps' },
  { name: 'UI / UX Design', href: '/services/ui-ux' },
  { name: 'AI Solutions', href: '/services/ai-solutions' },
  { name: 'Business Automation', href: '/services/automation' },
  { name: 'Digital Career Solutions', href: '/services/resume-portfolio' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms' },
];

export const Footer: React.FC = () => {
  const companyEmail = 'contactzovo@gmail.com';
  const whatsappNumber = '+91 7603865862';
  const cleanPhone = '917603865862';
  const whatsappMessage = encodeURIComponent('Hi ZOVO, I would like to discuss a digital project.');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  return (
    <footer className="border-t border-[#14171F] bg-[#0D1017] text-[#8E97A8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <ZovoLogo variant="dark" height={32} showTagline={false} />
            <p className="text-sm text-[#8E97A8] max-w-sm leading-relaxed mt-3 font-normal">
              Turning Ideas Into Digital Solutions. We help businesses, startups, creators, and individuals
              turn ideas into thoughtful, reliable digital experiences.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-sm">
              <a
                href={`mailto:${companyEmail}`}
                className="inline-flex items-center gap-2 text-[#F4F6FA] hover:text-[#1F5BFF] transition-colors"
              >
                <Mail size={14} className="text-[#1F5BFF]" />
                <span>{companyEmail}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F4F6FA] hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon size={16} variant="color" className="shrink-0" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F4F6FA]">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F4F6FA] hover:underline underline-offset-4 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F4F6FA]">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F4F6FA] hover:underline underline-offset-4 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Legal */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F4F6FA]">
              Connect & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://linkedin.com/company/zovo-digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F6FA] inline-flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/zovo.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F6FA] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F4F6FA] hover:underline underline-offset-4 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-[#F4F6FA] text-xs text-[#8E97A8]/60 inline-flex items-center gap-1 transition-colors mt-2"
                >
                  Admin Portal <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E97A8]">
          <p>© 2026 ZOVO. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8E97A8]/70">Two blocks, one connection.</span>
            <span>•</span>
            <Link href="/contact" className="text-[#1F5BFF] hover:underline font-medium">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
