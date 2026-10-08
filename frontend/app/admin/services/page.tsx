'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ServiceItem } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Sliders, Edit2, CheckCircle2, Globe, Loader2, Save } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit fields
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [isActive, setIsActive] = useState(true);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminServices();
      setServices(data);
    } catch (err) {
      console.error('Failed to load services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setTitle(svc.title);
    setShortDesc(svc.short_description);
    setFullDesc(svc.full_description);
    setIsActive(svc.is_active);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    try {
      const updated = await api.updateAdminService(editingService.id, {
        title,
        short_description: shortDesc,
        full_description: fullDesc,
        is_active: isActive,
      });

      setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditingService(null);
    } catch (err) {
      alert('Failed to update service: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#14171F]">Service Management</h1>
        <p className="text-xs text-[#64748B] mt-1">
          Customize offerings, capability descriptions, and active status visible across the website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          <div className="col-span-2 p-16 text-center text-[#64748B] flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#1F5BFF]" />
            <span className="text-xs">Loading services from database...</span>
          </div>
        ) : (
          services.map((svc) => (
            <div
              key={svc.id}
              className="rounded-2xl bg-white border border-[#E2E6EF] shadow-sm p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-[#1F5BFF] font-bold">0{svc.order}</span>
                    <h2 className="text-base font-bold text-[#14171F]">{svc.title}</h2>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      svc.is_active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {svc.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {svc.short_description}
                </p>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E6EF] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Key Deliverables</span>
                  <div className="flex flex-wrap gap-1">
                    {svc.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] bg-white border border-[#E2E6EF] px-2 py-0.5 rounded text-[#334155]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E6EF] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#64748B]">/{svc.slug}</span>
                <button
                  onClick={() => handleOpenEdit(svc)}
                  className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#F4F6FA] border border-[#E2E6EF] px-3 py-1.5 text-xs text-[#14171F] hover:bg-[#1F5BFF] hover:text-white hover:border-[#1F5BFF] transition-colors"
                >
                  <Edit2 size={12} />
                  <span>Edit Content</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <Modal
          isOpen={!!editingService}
          onClose={() => setEditingService(null)}
          title={`Edit Service: ${editingService.title}`}
          maxWidth="xl"
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                Service Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                Short Summary (Card Teaser)
              </label>
              <textarea
                rows={2}
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                Full Description (Detailed Page)
              </label>
              <textarea
                rows={4}
                required
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#1F5BFF] focus:ring-[#1F5BFF]"
                />
                <span className="text-xs text-[#14171F] font-medium">Active & visible on public site</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2E6EF]">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-[8px] bg-white border border-[#CBD5E1] text-xs font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-[8px] bg-[#1F5BFF] text-xs font-semibold text-white shadow-sm hover:bg-[#1347D8] disabled:opacity-50 transition-colors"
              >
                {saving && <Loader2 size={13} className="animate-spin" />}
                <span>Save Service</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
