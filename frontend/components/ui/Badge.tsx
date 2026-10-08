import React from 'react';
import { cn } from '@/lib/utils';
import { EnquiryPriority, EnquiryStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'electric' | 'coral' | 'success' | 'warning' | 'muted' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variantStyles = {
    default: 'bg-[#F4F6FA] text-[#14171F] border border-[#E2E6EF]',
    electric: 'bg-blue-50 text-[#1F5BFF] border border-blue-200',
    coral: 'bg-orange-50 text-[#FF6B3D] border border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    muted: 'bg-[#F4F6FA] text-[#5A6578] border border-[#E2E6EF]',
    outline: 'bg-transparent text-[#14171F] border border-[#CBD5E1]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-mono font-medium tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: EnquiryStatus | string }> = ({ status }) => {
  switch (status) {
    case 'NEW':
      return <Badge variant="electric">New</Badge>;
    case 'CONTACTED':
      return <Badge variant="warning">Contacted</Badge>;
    case 'IN_PROGRESS':
      return <Badge variant="electric">In Progress</Badge>;
    case 'CONVERTED':
      return <Badge variant="success">Converted</Badge>;
    case 'CLOSED':
      return <Badge variant="muted">Closed</Badge>;
    case 'SPAM':
      return <Badge variant="coral">Spam</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
};

export const PriorityBadge: React.FC<{ priority: EnquiryPriority | string }> = ({ priority }) => {
  switch (priority) {
    case 'HIGH':
      return <Badge variant="coral">High</Badge>;
    case 'MEDIUM':
      return <Badge variant="warning">Medium</Badge>;
    case 'LOW':
      return <Badge variant="muted">Low</Badge>;
    default:
      return <Badge variant="default">{priority}</Badge>;
  }
};
