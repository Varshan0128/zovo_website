'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { analytics } from '@/lib/analytics';

const serviceOptions = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'AI Solutions',
  'Business Automation',
  'Resume & Portfolio',
  'Other',
];

const budgetOptions = [
  'Not sure yet',
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
  "Let's discuss",
];

const timelineOptions = [
  'As soon as possible',
  '1–2 weeks',
  '1 month',
  '1–3 months',
  'Flexible',
  'Not sure yet',
];

const sourceOptions = [
  'Google',
  'LinkedIn',
  'Instagram',
  'WhatsApp',
  'Referral',
  'Other',
];

export const ContactForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    description: '',
    source: '',
    consent: false,
    hp_token: '', // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.service) errs.service = 'Please select a service';
    if (!formData.description.trim()) {
      errs.description = 'Please describe your project or requirement';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters';
    }
    if (!formData.consent) {
      errs.consent = 'You must give consent for ZOVO to contact you regarding this enquiry';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    const checked = (target as HTMLInputElement).checked;
    const isCheckbox = target.type === 'checkbox';

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot spam detection
    if (formData.hp_token) {
      console.warn('Spam detected');
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    analytics.trackEvent('form_submission', { service_name: formData.service });

    try {
      const res = await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        service: formData.service,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        description: formData.description,
        source: formData.source || undefined,
        consent: formData.consent,
      });

      if (res.success) {
        const refCode = res.reference_id || res.enquiry_id;
        sessionStorage.setItem('zovo_enquiry_id', refCode);
        sessionStorage.setItem('zovo_enquiry_name', formData.name);
        router.push(`/thank-you?id=${encodeURIComponent(refCode)}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit enquiry. Please try again.';
      setServerError(msg);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-7 sm:p-11 shadow-[0_12px_36px_rgba(20,23,31,0.04)] space-y-6"
    >
      {/* Honeypot hidden input */}
      <input
        type="text"
        name="hp_token"
        value={formData.hp_token}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {serverError && (
        <div className="rounded-[8px] bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-center gap-3">
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
            Full Name <span className="text-[#FF6B3D]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className={`w-full rounded-[8px] bg-[#FFFFFF] border px-4 py-3 text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all ${
              errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#CBD5E1]'
            }`}
          />
          {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
            Email Address <span className="text-[#FF6B3D]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. rahul@example.com"
            className={`w-full rounded-[8px] bg-[#FFFFFF] border px-4 py-3 text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all ${
              errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#CBD5E1]'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578]">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-3 text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578]">
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Business or Studio"
            className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-3 text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Row 3: Service */}
      <div className="space-y-2">
        <label htmlFor="service" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
          Service Required <span className="text-[#FF6B3D]">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className={`w-full rounded-[8px] bg-[#FFFFFF] border px-4 py-3 text-sm text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all ${
            errors.service ? 'border-red-400 bg-red-50/20' : 'border-[#CBD5E1]'
          }`}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[#FFFFFF] text-[#14171F]">
              {opt}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-600 font-medium">{errors.service}</p>}
      </div>

      {/* Row 4: Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578]">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-3 text-sm text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
          >
            <option value="">Select budget range...</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-[#FFFFFF] text-[#14171F]">
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timeline" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578]">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-3 text-sm text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
          >
            <option value="">Select timeline...</option>
            {timelineOptions.map((t) => (
              <option key={t} value={t} className="bg-[#FFFFFF] text-[#14171F]">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#14171F]">
          Project Description <span className="text-[#FF6B3D]">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us what you are looking to build, key features, or operational requirements..."
          className={`w-full rounded-[8px] bg-[#FFFFFF] border px-4 py-3 text-sm text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all ${
            errors.description ? 'border-red-400 bg-red-50/20' : 'border-[#CBD5E1]'
          }`}
        />
        {errors.description && <p className="text-xs text-red-600 font-medium">{errors.description}</p>}
      </div>

      {/* Row 6: Source */}
      <div className="space-y-2">
        <label htmlFor="source" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578]">
          How did you hear about us?
        </label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-3 text-sm text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] focus:border-transparent transition-all"
        >
          <option value="">Select source...</option>
          {sourceOptions.map((s) => (
            <option key={s} value={s} className="bg-[#FFFFFF] text-[#14171F]">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Row 7: Consent */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-[#CBD5E1] text-[#1F5BFF] focus:ring-[#1F5BFF]"
          />
          <span className="text-xs text-[#5A6578] leading-relaxed">
            I agree that ZOVO may store my enquiry details and contact me regarding this project enquiry. <span className="text-[#FF6B3D]">*</span>
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.consent}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#1F5BFF] py-4 px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:translate-x-1 hover:shadow-md transition-all duration-200 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <span>Send Enquiry</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
