'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ZovoLogo } from '@/components/brand/ZovoLogo';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { analytics } from '@/lib/analytics';

const navLinks = [
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Web Development', href: '/services/web-development', desc: 'Websites and web applications built around your business' },
      { name: 'Mobile Apps', href: '/services/mobile-apps', desc: 'Thoughtful mobile experiences for real users' },
      { name: 'UI / UX Design', href: '/services/ui-ux', desc: 'Interfaces that are clear, useful and memorable' },
      { name: 'AI Solutions', href: '/services/ai-solutions', desc: 'Practical AI systems built around real workflows' },
      { name: 'Automation', href: '/services/automation', desc: 'Connect repetitive processes and reduce manual work' },
      { name: 'Digital Career Solutions', href: '/services/resume-portfolio', desc: 'Professional resume and portfolio experiences' },
    ],
  },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const handleCtaClick = () => {
    analytics.trackEvent('contact_cta_click', { location: 'navbar' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E6EF] shadow-[0_2px_12px_rgba(20,23,31,0.04)] py-3'
          : 'bg-[#FFFFFF] border-b border-[#E2E6EF]/70 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on white */}
          <ZovoLogo variant="light" height={32} href="/" showTagline={false} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href="/services"
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors py-1 ${
                        pathname.startsWith('/services')
                          ? 'text-[#1F5BFF] font-semibold'
                          : 'text-[#14171F] hover:text-[#1F5BFF]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 text-[#5A6578] ${
                          servicesDropdownOpen ? 'rotate-180 text-[#1F5BFF]' : ''
                        }`}
                      />
                    </Link>

                    {/* Editorial Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-84 pt-2 z-50">
                        <div className="bg-[#FFFFFF] border border-[#E2E6EF] rounded-xl p-3 shadow-[0_16px_36px_rgba(20,23,31,0.08)]">
                          <div className="space-y-1">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block p-2.5 rounded-lg hover:bg-[#F4F6FA] transition-colors group"
                              >
                                <div className="text-xs font-semibold text-[#14171F] group-hover:text-[#1F5BFF] transition-colors flex items-center justify-between">
                                  <span>{sub.name}</span>
                                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1F5BFF]" />
                                </div>
                                <div className="text-[11px] text-[#5A6578] mt-0.5 line-clamp-1">
                                  {sub.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#E2E6EF] px-2.5 flex justify-between items-center">
                            <Link
                              href="/services"
                              className="text-xs text-[#1F5BFF] hover:underline font-semibold inline-flex items-center gap-1"
                            >
                              Explore all services <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#1F5BFF] font-semibold'
                      : 'text-[#14171F] hover:text-[#1F5BFF]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Start a Project</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle & CTA */}
          <div className="flex md:hidden items-center gap-2.5">
            <Link
              href="/contact"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center rounded-[8px] bg-[#1F5BFF] px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              Start a Project
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E2E6EF] px-5 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/services"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA]"
            >
              Services
            </Link>
            <div className="pl-4 border-l-2 border-[#1F5BFF]/30 ml-3 space-y-1.5 my-1">
              {navLinks[0].dropdown?.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="block py-1 text-xs text-[#5A6578] hover:text-[#1F5BFF]"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
            <Link
              href="/work"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA]"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#14171F] hover:bg-[#F4F6FA]"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#E2E6EF]">
            <Link
              href="/contact"
              onClick={handleCtaClick}
              className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] py-3 text-sm font-semibold text-white shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
