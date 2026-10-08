'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZovoLogo } from '@/components/brand/ZovoLogo';
import { api } from '@/lib/api';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@zovo.digital');
  const [password, setPassword] = useState('ZovoAdmin2026!Secure');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await api.adminLogin({ email, password });
      if (data.access_token) {
        localStorage.setItem('zovo_admin_token', data.access_token);
        router.push('/admin');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials or login failed';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4 relative">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <ZovoLogo variant="light" height={32} showTagline={false} />
          <h1 className="text-xl font-bold text-[#14171F] tracking-tight">
            Administrator Authentication
          </h1>
          <p className="text-xs text-[#5A6578]">
            Sign in to access ZOVO enquiries, projects, and site settings.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 sm:p-10 shadow-[0_12px_36px_rgba(20,23,31,0.04)] space-y-5"
        >
          {error && (
            <div className="rounded-[8px] bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle size={15} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zovo.digital"
                className="w-full pl-10 pr-4 py-3 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
                <Lock size={16} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] py-3.5 px-4 text-sm font-semibold text-white shadow-xs hover:bg-[#1347D8] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-[#5A6578]">
          <span>Protected internal portal. Unauthorized access is monitored.</span>
        </div>
      </div>
    </div>
  );
}
