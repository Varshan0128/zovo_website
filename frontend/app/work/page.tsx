'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { CTASection } from '@/components/home/CTASection';
import { Project } from '@/types';
import { api } from '@/lib/api';
import { FolderGit2, ArrowRight, ExternalLink } from 'lucide-react';
import { SlideUp } from '@/components/ui/Motion';

const categories = ['All', 'Web', 'Mobile', 'AI', 'Automation', 'Custom'];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const cat = activeCategory === 'All' ? undefined : activeCategory;
        const data = await api.getProjects({ category: cat });
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [activeCategory]);

  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E6EF]">
        <div className="absolute inset-0 bg-grid-swiss opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F6FA] border border-[#E2E6EF] text-[12px] font-mono tracking-wider text-[#5A6578] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
            <span>CASE STUDIES & PRODUCTION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14171F] tracking-tight leading-[1.08]">
            Selected Engagements<span className="text-[#FF6B3D]">.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed max-w-2xl mx-auto">
            Real digital platforms engineered to solve practical operational, product, and architectural challenges.
          </p>

          {/* Categories Pill Filters */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-[8px] px-4 py-2 text-xs font-mono font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1F5BFF] text-white shadow-xs'
                    : 'bg-white text-[#5A6578] border border-[#E2E6EF] hover:text-[#14171F] hover:bg-[#F4F6FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid / Empty State */}
      <section className="py-20 md:py-28 bg-[#F4F6FA] border-b border-[#E2E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <h2 className="text-2xl font-bold text-[#14171F] group-hover:text-[#1F5BFF] transition-colors">
                        {proj.title}
                      </h2>
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
                          aria-label="View live project"
                        >
                          <span>Visit</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>
          ) : (
            /* Clean honest empty state */
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-12 md:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
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
                  Have an idea worth building? We work with founders, teams, and individuals to turn requirements into live production software.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#1F5BFF] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1347D8] hover:-translate-y-0.5 transition-all"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
