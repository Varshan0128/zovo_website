'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { ContactSubmission, EnquiryPriority, EnquiryStatus } from '@/types';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatDateTime } from '@/lib/utils';
import {
  Search,
  Download,
  Trash2,
  Eye,
  Save,
  AlertTriangle,
  RefreshCw,
  Loader2,
} from 'lucide-react';

const statuses: EnquiryStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED', 'SPAM'];
const priorities: EnquiryPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);

  // Edit fields in modal
  const [editStatus, setEditStatus] = useState<EnquiryStatus>('NEW');
  const [editPriority, setEditPriority] = useState<EnquiryPriority>('MEDIUM');
  const [editNotes, setEditNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAdminEnquiries({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        search: searchTerm || undefined,
        limit: 100,
      });
      setEnquiries(data.items);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to fetch enquiries', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, searchTerm]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleOpenDetail = (item: ContactSubmission) => {
    setSelectedEnquiry(item);
    setEditStatus(item.status);
    setEditPriority(item.priority);
    setEditNotes(item.admin_notes || '');
  };

  const handleSaveDetail = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const updated = await api.updateEnquiry(selectedEnquiry.id, {
        status: editStatus,
        priority: editPriority,
        admin_notes: editNotes,
      });

      // Update local state
      setEnquiries((prev) =>
        prev.map((e) => (e.id === updated.id ? { ...e, ...updated } : e))
      );
      setSelectedEnquiry(updated);
    } catch (err) {
      alert('Failed to update enquiry: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.deleteEnquiry(deleteTarget.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setTotal((t) => t - 1);
      if (selectedEnquiry?.id === deleteTarget.id) {
        setSelectedEnquiry(null);
      }
      setDeleteTarget(null);
    } catch (err) {
      alert('Failed to delete enquiry: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      const csvText = await api.exportEnquiriesCsv();
      const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `zovo_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Export failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14171F]">Enquiry Management</h1>
          <p className="text-xs text-[#5A6578] mt-1 font-mono">
            CRM database for client submissions, project timelines, and lead statuses ({total} total).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] p-2 text-xs text-[#5A6578] hover:text-[#14171F]"
            title="Refresh list"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-4 flex flex-col md:flex-row items-center gap-4 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search by client name, email, company, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] text-xs text-[#14171F] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3 py-2 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3 py-2 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
          >
            <option value="">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-16 text-center text-[#5A6578] flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#1F5BFF]" />
            <span className="text-xs">Loading enquiries...</span>
          </div>
        ) : enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6FA] text-[#5A6578] uppercase font-mono tracking-wider border-b border-[#E2E6EF]">
                <tr>
                  <th className="py-3 px-5">Client</th>
                  <th className="py-3 px-5">Service</th>
                  <th className="py-3 px-5">Budget / Timeline</th>
                  <th className="py-3 px-5">Priority</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Submitted</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EF]">
                {enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F4F6FA] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#14171F]">{item.name}</div>
                      <div className="text-[11px] text-[#5A6578]">{item.email}</div>
                      {item.company && (
                        <div className="text-[10px] text-[#8E97A8]">{item.company}</div>
                      )}
                    </td>
                    <td className="py-4 px-5 text-[#14171F] font-medium">{item.service}</td>
                    <td className="py-4 px-5 text-[#5A6578]">
                      <div>{item.budget || 'Budget: N/A'}</div>
                      <div className="text-[10px] text-[#8E97A8]">{item.timeline || 'Flexible'}</div>
                    </td>
                    <td className="py-4 px-5">
                      <PriorityBadge priority={item.priority} />
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-5 text-[#5A6578]">{formatDateTime(item.created_at)}</td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#CBD5E1] px-2.5 py-1 text-xs text-[#14171F] hover:bg-[#1F5BFF] hover:border-[#1F5BFF] hover:text-white transition-colors"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1 rounded-[6px] text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete spam"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[#5A6578] space-y-2">
            <p>No enquiries found matching your query.</p>
            {(statusFilter || priorityFilter || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('');
                  priorityFilter;
                  setSearchTerm('');
                }}
                className="text-[#1F5BFF] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Inspect & Edit Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.name}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs text-[#14171F]">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F4F6FA] p-4 rounded-xl border border-[#E2E6EF]">
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Email</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-[#1F5BFF] font-semibold">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Phone / WhatsApp</span>
                <span className="font-semibold text-[#14171F]">{selectedEnquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Company</span>
                <span className="font-semibold text-[#14171F]">{selectedEnquiry.company || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Service</span>
                <span className="font-semibold text-[#1F5BFF]">{selectedEnquiry.service}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Budget</span>
                <span className="font-semibold text-[#14171F]">{selectedEnquiry.budget || 'Flexible'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Timeline</span>
                <span className="font-semibold text-[#14171F]">{selectedEnquiry.timeline || 'Flexible'}</span>
              </div>
            </div>

            {/* Client Requirement Description */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578] block mb-2">
                Project Requirement Description
              </span>
              <div className="bg-[#F4F6FA] p-4 rounded-xl border border-[#E2E6EF] text-sm leading-relaxed text-[#14171F] whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedEnquiry.description}
              </div>
            </div>

            {/* CRM Controls */}
            <div className="pt-4 border-t border-[#E2E6EF] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#14171F]">
                CRM Status & Internal Notes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#5A6578] font-medium">Pipeline Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                    className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3 py-2 text-xs text-[#14171F]"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#5A6578] font-medium">Priority Level</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as EnquiryPriority)}
                    className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3 py-2 text-xs text-[#14171F]"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#5A6578] font-medium">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record call summaries, follow-up dates, proposal quotes, or client preferences..."
                  className="w-full rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3 py-2 text-xs text-[#14171F] placeholder-[#94A3B8]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-[10px] text-[#5A6578]">
                  ID: {selectedEnquiry.id}
                </span>

                <button
                  onClick={handleSaveDetail}
                  disabled={savingNotes}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1347D8] transition-colors disabled:opacity-50"
                >
                  {savingNotes ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Confirm Deletion"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-[#14171F]">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle size={24} className="shrink-0" />
              <p className="text-sm font-semibold">
                Delete enquiry from {deleteTarget.name}?
              </p>
            </div>
            <p className="text-xs text-[#5A6578] leading-relaxed">
              This action cannot be undone. Use this exclusively for spam or junk submissions.
            </p>
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E2E6EF]">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 rounded-[8px] bg-white border border-[#CBD5E1] text-xs text-[#14171F] hover:bg-[#F4F6FA]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-red-600 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && <Loader2 size={12} className="animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
