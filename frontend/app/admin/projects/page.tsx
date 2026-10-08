'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Project } from '@/types';
import { Modal } from '@/components/ui/Modal';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Globe,
  Loader2,
  Check,
  AlertTriangle,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Web Applications',
    client_name: '',
    project_url: '',
    thumbnail: '',
    technologies: '',
    featured: false,
    published: true,
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: 'Web Applications',
      client_name: '',
      project_url: '',
      thumbnail: '',
      technologies: 'Next.js, FastAPI, PostgreSQL',
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      description: proj.description,
      category: proj.category,
      client_name: proj.client_name || '',
      project_url: proj.project_url || '',
      thumbnail: proj.thumbnail || '',
      technologies: proj.technologies.join(', '),
      featured: proj.featured,
      published: proj.published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      slug: formData.slug || undefined,
      description: formData.description,
      category: formData.category,
      client_name: formData.client_name || undefined,
      project_url: formData.project_url || undefined,
      thumbnail: formData.thumbnail || undefined,
      technologies: techArray,
      featured: formData.featured,
      published: formData.published,
    };

    try {
      if (editingProject) {
        const updated = await api.updateProject(editingProject.id, payload);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await api.createProject(payload);
        setProjects((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to save project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.deleteProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert('Failed to delete project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (proj: Project) => {
    try {
      const updated = await api.updateProject(proj.id, { published: !proj.published });
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      alert('Failed to toggle publish: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14171F]">Portfolio & Projects</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage showcase case studies, client work, and technologies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1347D8] transition-colors"
        >
          <Plus size={15} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid / Table */}
      <div className="rounded-2xl bg-white border border-[#E2E6EF] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-[#64748B] flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#1F5BFF]" />
            <span className="text-xs">Loading projects...</span>
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-mono tracking-wider border-b border-[#E2E6EF]">
                <tr>
                  <th className="py-3 px-5">Title</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Technologies</th>
                  <th className="py-3 px-5">Featured</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EF]">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#14171F]">{proj.title}</div>
                      <div className="text-[11px] text-[#64748B] font-mono">/{proj.slug}</div>
                      {proj.client_name && (
                        <div className="text-[10px] text-[#94A3B8]">Client: {proj.client_name}</div>
                      )}
                    </td>
                    <td className="py-4 px-5 text-[#14171F] font-medium">{proj.category}</td>
                    <td className="py-4 px-5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="bg-[#F4F6FA] border border-[#E2E6EF] px-2 py-0.5 rounded text-[10px] text-[#475569]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      {proj.featured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Star size={11} className="fill-amber-500 text-amber-500" /> Featured
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8]">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          proj.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {proj.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-[#F4F6FA] border border-[#E2E6EF] text-[#475569] hover:bg-[#1F5BFF] hover:text-white hover:border-[#1F5BFF] transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(proj)}
                        className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[#64748B] space-y-3">
            <p>No projects in the portfolio yet.</p>
            <p className="text-[11px] text-[#94A3B8]">
              The public work section currently shows the honest "Have an idea you'd like us to build?" CTA.
            </p>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1347D8] transition-colors shadow-sm"
            >
              <Plus size={14} /> Add First Project
            </button>
          </div>
        )}
      </div>

      {/* Project Create / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject ? 'Edit Project' : 'Create New Project'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Apex Health Portal"
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF]"
                >
                  <option value="Web Applications">Web Applications</option>
                  <option value="Mobile Apps">Mobile Apps</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="Business Automation">Business Automation</option>
                  <option value="UI/UX Systems">UI/UX Systems</option>
                  <option value="Custom Software">Custom Software</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of the business solution, technical challenge, and features..."
                className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Next.js, FastAPI, PostgreSQL, Tailwind"
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Client Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Acme Health Inc (optional)"
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Live Project URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                  Thumbnail Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-lg bg-white border border-[#CBD5E1] px-3.5 py-2.5 text-xs text-[#14171F] focus:outline-none focus:ring-2 focus:ring-[#1F5BFF] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Checkbox toggles */}
            <div className="pt-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-[#CBD5E1] text-[#1F5BFF] focus:ring-[#1F5BFF]"
                />
                <span className="text-xs text-[#14171F] font-medium">Featured on homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded border-[#CBD5E1] text-[#1F5BFF] focus:ring-[#1F5BFF]"
                />
                <span className="text-xs text-[#14171F] font-medium">Published to public showcase</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2E6EF]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
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
                <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Delete Project"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-[#475569]">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={24} className="shrink-0" />
              <p className="text-sm font-semibold text-[#14171F]">
                Delete "{deleteTarget.title}"?
              </p>
            </div>
            <p className="text-xs text-[#64748B]">
              This project will be permanently removed from the portfolio database.
            </p>
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E2E6EF]">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-[8px] bg-white border border-[#CBD5E1] text-xs font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-1.5 rounded-[8px] bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
