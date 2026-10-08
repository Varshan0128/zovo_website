'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ZovoLogo } from '@/components/brand/ZovoLogo';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Settings,
  Sliders,
  LogOut,
  ExternalLink,
  Shield,
  Loader2,
} from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Services', href: '/admin/services', icon: Sliders },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const { user, loading, logout } = useAuth(!isLoginPage);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center text-[#14171F]">
        <div className="flex items-center gap-3">
          <Loader2 size={24} className="animate-spin text-[#1F5BFF]" />
          <span className="text-sm font-medium">Verifying administrator session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#14171F] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FFFFFF] border-r border-[#E2E6EF] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#E2E6EF]">
          <ZovoLogo variant="light" height={28} href="/admin" showTagline={false} />
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#5A6578] bg-[#F4F6FA] px-2.5 py-1 rounded-[6px] border border-[#E2E6EF]">
            <Shield size={12} className="text-[#1F5BFF]" />
            <span>Admin Console</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1" aria-label="Admin Navigation">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1F5BFF] text-white shadow-xs'
                    : 'text-[#5A6578] hover:text-[#14171F] hover:bg-[#F4F6FA]'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-[#E2E6EF] space-y-3">
          <div className="px-3 py-2 rounded-[8px] bg-[#F4F6FA] border border-[#E2E6EF]">
            <div className="text-xs font-semibold text-[#14171F] truncate">
              {user?.full_name || 'Admin'}
            </div>
            <div className="text-[11px] text-[#5A6578] truncate">{user?.email}</div>
          </div>

          <div className="flex items-center justify-between px-1">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#5A6578] hover:text-[#1F5BFF] flex items-center gap-1.5 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={logout}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-[#E2E6EF] bg-[#FFFFFF] px-8 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="text-sm font-semibold text-[#14171F]">
            Platform Overview
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#5A6578]">
            <span>ZOVO v1.0 Production</span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
