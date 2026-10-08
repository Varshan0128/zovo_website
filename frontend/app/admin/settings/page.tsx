'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { SiteSettings } from '@/types';
import { Settings, Save, CheckCircle2, Loader2, Globe, Mail, MessageCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form fields
  const [companyName, setCompanyName] = useState('ZOVO');
  const [tagline, setTagline] = useState('Turning Ideas Into Digital Solutions.');
  const [companyEmail, setCompanyEmail] = useState('contactzovo@gmail.com');
  const [whatsappNumber, setWhatsappNumber] = useState('+91 7603865862');
  const [websiteUrl, setWebsiteUrl] = useState('https://zovo.digital');
  const [socialX, setSocialX] = useState('https://x.com/zovo_digital');
  const [socialLinkedin, setSocialLinkedin] = useState('https://linkedin.com/company/zovo-digital');
  const [socialGithub, setSocialGithub] = useState('https://github.com/zovo-digital');
  const [seoTitle, setSeoTitle] = useState('ZOVO — Turning Ideas Into Digital Solutions');
  const [seoDesc, setSeoDesc] = useState(
    'ZOVO helps individuals, startups, and businesses turn ideas into modern digital experiences, products, and solutions.'
  );

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const data = await api.getAdminSettings();
        setSettings(data);
        setCompanyName(data.company_name);
        setTagline(data.tagline);
        setCompanyEmail(data.company_email);
        setWhatsappNumber(data.whatsapp_number);
        setWebsiteUrl(data.website_url);
        setSocialX(data.social_x || '');
        setSocialLinkedin(data.social_linkedin || '');
        setSocialGithub(data.social_github || '');
        setSeoTitle(data.seo_title_default);
        setSeoDesc(data.seo_description_default);
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const updated = await api.updateAdminSettings({
        company_name: companyName,
        tagline,
        company_email: companyEmail,
        whatsapp_number: whatsappNumber,
        website_url: websiteUrl,
        social_x: socialX || undefined,
        social_linkedin: socialLinkedin || undefined,
        social_github: socialGithub || undefined,
        seo_title_default: seoTitle,
        seo_description_default: seoDesc,
      });

      setSettings(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-[#64748B] flex items-center justify-center gap-2">
        <Loader2 size={16} className="animate-spin text-[#1F5BFF]" />
        <span className="text-xs">Loading site configurations...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#14171F]">Site Settings</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Configure company identity, contact numbers, social links, and SEO defaults.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 size={14} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Company Profile */}
        <div className="rounded-2xl bg-white border border-[#E2E6EF] shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#14171F] uppercase tracking-wider border-b border-[#E2E6EF] pb-3">
            Company Profile & Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">Brand Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">Official Company Email</label>
              <input
                type="email"
                required
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">
                WhatsApp Support Number (International Format)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+91 7603865862"
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-semibold text-[#475569]">Production Website URL</label>
              <input
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://zovo.digital"
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Links */}
        <div className="rounded-2xl bg-white border border-[#E2E6EF] shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#14171F] uppercase tracking-wider border-b border-[#E2E6EF] pb-3">
            Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">X / Twitter Profile</label>
              <input
                type="url"
                value={socialX}
                onChange={(e) => setSocialX(e.target.value)}
                placeholder="https://x.com/zovo_digital"
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">LinkedIn Page</label>
              <input
                type="url"
                value={socialLinkedin}
                onChange={(e) => setSocialLinkedin(e.target.value)}
                placeholder="https://linkedin.com/company/zovo-digital"
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">GitHub Organization</label>
              <input
                type="url"
                value={socialGithub}
                onChange={(e) => setSocialGithub(e.target.value)}
                placeholder="https://github.com/zovo-digital"
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: SEO Defaults */}
        <div className="rounded-2xl bg-white border border-[#E2E6EF] shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#14171F] uppercase tracking-wider border-b border-[#E2E6EF] pb-3">
            Search Engine Optimization (SEO) Defaults
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">Default Meta Title</label>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#475569]">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                required
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#1347D8] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
