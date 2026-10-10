'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import {
  User,
  Phone,
  Mail,
  Link as LinkIcon,
  Briefcase,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const domainOptions = [
  'Full Stack / Backend Engineer',
  'Frontend / Creative Developer',
  'UI/UX & Product Designer',
  'AI / ML & Data Specialist',
  'Consultant / Founder',
  'Other / Multi-disciplinary',
];

export const PortfolioApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reference_available: '',
    domain_or_role: 'Full Stack / Backend Engineer',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    reference_code: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide your contact phone or WhatsApp number.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.submitPortfolioLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        reference_available: formData.reference_available || undefined,
        domain_or_role: formData.domain_or_role || undefined,
        notes: formData.notes || undefined,
      });

      setSuccessData({
        reference_code: res.reference_code,
        message: res.message,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit application. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      reference_available: '',
      domain_or_role: 'Full Stack / Backend Engineer',
      notes: '',
    });
    setSuccessData(null);
    setError(null);
  };

  if (successData) {
    const waMessage = encodeURIComponent(
      `Hi ZOVO, I just submitted my portfolio application (Reference: ${successData.reference_code}). I'd like to discuss my custom portfolio build.`
    );
    const waUrl = `https://wa.me/917603865862?text=${waMessage}`;

    return (
      <div className="rounded-2xl bg-[#FFFFFF] border-2 border-emerald-500/20 p-8 sm:p-10 shadow-[0_16px_40px_rgba(20,23,31,0.06)] text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-emerald-50 text-emerald-700 text-xs font-mono font-medium tracking-wide">
            <FileSpreadsheet size={14} />
            <span>RECORDED TO CLIENT SPREADSHEET</span>
          </div>
          <h3 className="text-2xl font-bold text-[#14171F] tracking-tight">
            Portfolio Application Received!
          </h3>
          <p className="text-sm text-[#5A6578] max-w-md mx-auto leading-relaxed">
            {successData.message}
          </p>
        </div>

        {/* Reference Code Card */}
        <div className="rounded-xl bg-[#F4F6FA] border border-[#E2E6EF] p-4 max-w-sm mx-auto space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#5A6578] tracking-wider block">
            Your Application Tracking ID
          </span>
          <span className="text-lg font-mono font-bold text-[#1F5BFF]">
            {successData.reference_code}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[#20ba59] transition-all"
          >
            <WhatsAppIcon size={18} variant="white" />
            <span>Chat With Lead Strategist</span>
          </a>

          <button
            onClick={resetForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[8px] bg-white border border-[#CBD5E1] px-5 py-3 text-sm font-medium text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
          >
            <span>Submit Another</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 sm:p-10 shadow-[0_16px_40px_rgba(20,23,31,0.06)] space-y-6"
    >
      <div className="space-y-1.5 pb-2 border-b border-[#E2E6EF]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#1F5BFF] font-semibold flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>PORTFOLIO APPLICANT ONBOARDING</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[4px]">
            <FileSpreadsheet size={11} />
            <span>Syncs to Sheet</span>
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#14171F]">Request Your Custom Portfolio</h3>
        <p className="text-xs text-[#5A6578]">
          Fill in your details below. The data is automatically formatted and saved directly into our client spreadsheet.
        </p>
      </div>

      {error && (
        <div className="rounded-[8px] bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-center gap-2.5">
          <AlertCircle size={15} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
            Full Name <span className="text-[#FF6B3D]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
              <User size={15} />
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Alex Henderson"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-sm text-[#14171F] placeholder:text-[#8E97A8] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
            Phone / WhatsApp <span className="text-[#FF6B3D]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
              <Phone size={15} />
            </div>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-sm text-[#14171F] placeholder:text-[#8E97A8] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
          Email Address <span className="text-[#FF6B3D]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
            <Mail size={15} />
          </div>
          <input
            type="email"
            required
            placeholder="alex.henderson@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-sm text-[#14171F] placeholder:text-[#8E97A8] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all"
          />
        </div>
      </div>

      {/* Reference Available (Optional) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
            Reference Available <span className="text-[#5A6578] font-normal lowercase">(optional)</span>
          </label>
          <span className="text-[11px] font-mono text-[#8E97A8]">LinkedIn / GitHub / Behance / Link</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
            <LinkIcon size={15} />
          </div>
          <input
            type="text"
            placeholder="https://linkedin.com/in/yourname or existing site link"
            value={formData.reference_available}
            onChange={(e) => setFormData({ ...formData, reference_available: e.target.value })}
            className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-sm text-[#14171F] placeholder:text-[#8E97A8] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all"
          />
        </div>
      </div>

      {/* Target Domain / Role */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
          Primary Career Domain / Role
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6578]">
            <Briefcase size={15} />
          </div>
          <select
            value={formData.domain_or_role}
            onChange={(e) => setFormData({ ...formData, domain_or_role: e.target.value })}
            className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-sm text-[#14171F] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all"
          >
            {domainOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes / Special Requests (Optional) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
          Notes & Desired Features <span className="text-[#5A6578] font-normal lowercase">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Tell us about specific ideas, interactive animations, custom domain preferences, or target timeline..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full rounded-[8px] border border-[#CBD5E1] bg-[#FFFFFF] p-3 text-sm text-[#14171F] placeholder:text-[#8E97A8] focus:border-[#1F5BFF] focus:outline-none focus:ring-1 focus:ring-[#1F5BFF] transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] py-3.5 px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Saving Application to Spreadsheet...</span>
            </>
          ) : (
            <>
              <span>Submit Portfolio Request & Sync to Sheet</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-[#5A6578] mt-2.5 font-mono">
          🔒 Encrypted transmission • Instant confirmation & spreadsheet logging
        </p>
      </div>
    </form>
  );
};
