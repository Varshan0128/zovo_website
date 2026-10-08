export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'CONVERTED'
  | 'CLOSED'
  | 'SPAM';

export type EnquiryPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
  source?: string | null;
  consent: boolean;
  status: EnquiryStatus;
  priority: EnquiryPriority;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail?: string | null;
  images: string[];
  technologies: string[];
  client_name?: string | null;
  project_url?: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  features: string[];
  deliverables: string[];
  icon_name: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  tagline: string;
  company_email: string;
  whatsapp_number: string;
  social_x?: string;
  social_linkedin?: string;
  social_github?: string;
  website_url: string;
  seo_title_default: string;
  seo_description_default: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
}

export interface DashboardStats {
  new_enquiries: number;
  in_progress_enquiries: number;
  converted_enquiries: number;
  total_enquiries: number;
  active_projects: number;
  published_projects: number;
  recent_enquiries: ContactSubmission[];
}
