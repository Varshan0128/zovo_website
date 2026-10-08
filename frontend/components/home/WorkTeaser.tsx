'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Project } from '@/types';
import { api } from '@/lib/api';
import { analytics } from '@/lib/analytics';
import { SlideUp } from '@/components/ui/Motion';

export const WorkTeaser: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.getProjects({ featured: true });
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section className="py-24 md:py-32 relative bg-[#F4F6FA] border-b border-[#E2E6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-[12px] font-mono tracking-widest text-[#1F5BFF] uppercase font-semibold">
              CASE STUDIES & WORK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14171F] tracking-tight">
              Selected Engagements<span className="text-[#FF6B3D]">.</span>
            </h2>
            <p className="text-base text-[#5A6578] font-normal leading-relaxed">
              Software platforms, web applications, and mobile experiences engineered for founders and businesses.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F5BFF] hover:underline"
          >
            <span>All Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Dynamic Project Content or Compliant Agency Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-80 rounded-xl bg-white border border-[#E2E6EF] animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <SlideUp key={proj.id}>
                <div className="group rounded-xl bg-[#FFFFFF] border border-[#E2E6EF] p-8 shadow-xs hover:border-[#1F5BFF] transition-all duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#5A6578]">
                      <span className="font-semibold text-[#1F5BFF] uppercase tracking-wider">{proj.category}</span>
                      {proj.client_name && <span>{proj.client_name}</span>}
                    </div>
                    <h3 className="text-2xl font-bold text-[#14171F] group-hover:text-[#1F5BFF] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-[#5A6578] leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2E6EF] flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#F4F6FA] text-[#5A6578] border border-[#E2E6EF]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.project_url && (
                      <a
                        href={proj.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#1F5BFF] inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Visit</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        ) : (
          /* Editorial Compliant Empty State — Strict adherence to brand honesty rule */
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-10 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#F4F6FA] border border-[#E2E6EF] text-[#1F5BFF]">
              <FolderGit2 size={26} />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B3D] font-bold block">
                OPPORTUNITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">
                Your next project could be here<span className="text-[#FF6B3D]">.</span>
              </h3>
              <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed max-w-md mx-auto">
                Have an idea worth building? We partner with founders, teams, and individuals to turn requirements into live production software.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => analytics.trackEvent('contact_cta_click', { location: 'work_empty_state' })}
                className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
