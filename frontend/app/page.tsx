import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { Hero } from '@/components/home/Hero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyZovo } from '@/components/home/WhyZovo';
import { Process } from '@/components/home/Process';
import { WorkTeaser } from '@/components/home/WorkTeaser';
import { AboutSection } from '@/components/home/AboutSection';
import { CTASection } from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'ZOVO — Digital Solutions & Services',
  description:
    'ZOVO designs and builds websites, mobile apps and digital solutions for businesses, startups and individuals.',
};

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ServicesGrid />
      <WhyZovo />
      <Process />
      <WorkTeaser />
      <AboutSection />
      <CTASection />
    </SiteShell>
  );
}
