'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ContactSubmission, DashboardStats } from '@/types';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';
import {
  Inbox,
  Clock,
  CheckCircle,
  Briefcase,
  ArrowRight,
  Eye,
  RefreshCw,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactSubmission | null>(null);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header with quick refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14171F]">Dashboard Overview</h1>
          <p className="text-xs text-[#5A6578] mt-1">
            Real-time pipeline metrics and customer project enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] px-3.5 py-2 text-xs font-medium text-[#14171F] hover:bg-[#F4F6FA] transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1347D8] transition-colors"
          >
            <span>Manage Enquiries</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A6578]">
            <span>New Enquiries</span>
            <div className="h-8 w-8 rounded-[6px] bg-blue-50 text-[#1F5BFF] flex items-center justify-center border border-blue-100">
              <Inbox size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#14171F]">
            {loading ? '-' : stats?.new_enquiries ?? 0}
          </div>
          <p className="text-[11px] text-[#5A6578]">Awaiting initial review</p>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A6578]">
            <span>In Progress</span>
            <div className="h-8 w-8 rounded-[6px] bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#14171F]">
            {loading ? '-' : stats?.in_progress_enquiries ?? 0}
          </div>
          <p className="text-[11px] text-[#5A6578]">Discovery & proposal phase</p>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A6578]">
            <span>Converted</span>
            <div className="h-8 w-8 rounded-[6px] bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#14171F]">
            {loading ? '-' : stats?.converted_enquiries ?? 0}
          </div>
          <p className="text-[11px] text-[#5A6578]">Engaged client projects</p>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A6578]">
            <span>Active Projects</span>
            <div className="h-8 w-8 rounded-[6px] bg-orange-50 text-[#FF6B3D] flex items-center justify-center border border-orange-100">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#14171F]">
            {loading ? '-' : stats?.active_projects ?? 0}
          </div>
          <p className="text-[11px] text-[#5A6578]">
            {stats?.published_projects ?? 0} published to showcase
          </p>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E2E6EF] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#14171F]">Recent Project Enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="text-xs text-[#1F5BFF] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View all ({stats?.total_enquiries ?? 0})</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#5A6578] flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#1F5BFF]" />
            <span className="text-xs">Loading recent enquiries...</span>
          </div>
        ) : stats?.recent_enquiries && stats.recent_enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6FA] text-[#5A6578] uppercase font-mono tracking-wider border-b border-[#E2E6EF]">
                <tr>
                  <th className="py-3 px-5">Client</th>
                  <th className="py-3 px-5">Service</th>
                  <th className="py-3 px-5">Budget</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EF]">
                {stats.recent_enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F4F6FA] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#14171F]">{item.name}</div>
                      <div className="text-[11px] text-[#5A6578]">{item.email}</div>
                    </td>
                    <td className="py-4 px-5 text-[#14171F] font-medium">{item.service}</td>
                    <td className="py-4 px-5 text-[#5A6578]">{item.budget || 'Flexible'}</td>
                    <td className="py-4 px-5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-5 text-[#5A6578]">{formatDate(item.created_at)}</td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedEnquiry(item)}
                        className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#CBD5E1] px-2.5 py-1 text-xs text-[#14171F] hover:bg-[#1F5BFF] hover:border-[#1F5BFF] hover:text-white transition-colors"
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-[#5A6578] space-y-2">
            <p>No project enquiries submitted yet.</p>
            <p className="text-[11px] text-[#8E97A8]">
              When a visitor submits the contact form, enquiries will appear here instantly.
            </p>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.name}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-[#14171F]">
            <div className="grid grid-cols-2 gap-4 bg-[#F4F6FA] p-4 rounded-xl border border-[#E2E6EF]">
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Email</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-[#1F5BFF] font-medium">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Phone / WhatsApp</span>
                <span className="font-medium text-[#14171F]">{selectedEnquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Company</span>
                <span className="font-medium text-[#14171F]">{selectedEnquiry.company || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Service Required</span>
                <span className="font-medium text-[#1F5BFF]">{selectedEnquiry.service}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Budget</span>
                <span className="font-medium text-[#14171F]">{selectedEnquiry.budget || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#5A6578] block font-mono text-[11px]">Timeline</span>
                <span className="font-medium text-[#14171F]">{selectedEnquiry.timeline || 'N/A'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6578] block mb-2">
                Project Requirement Description
              </span>
              <div className="bg-[#F4F6FA] p-4 rounded-xl border border-[#E2E6EF] text-sm leading-relaxed text-[#14171F] whitespace-pre-wrap">
                {selectedEnquiry.description}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#E2E6EF]">
              <span className="font-mono text-[10px] text-[#5A6578]">
                ID: {selectedEnquiry.id}
              </span>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-[#1F5BFF] hover:underline"
              >
                Go to full CRM editor →
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
