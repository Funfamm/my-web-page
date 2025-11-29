export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  genre: string[];
  duration: string;
  matchScore: number;
  resolutionTag: 'HD' | '4K' | '8K';
  thumbnailUrl: string;
  videoUrl?: string;
  isFeaturedHome: boolean;
  isFeaturedMovies: boolean;
}

export interface CastingSubmission {
  id: string; // Made required for admin handling
  name: string;
  email: string;
  socialHandle: string;
  socialPlatform: string;
  bio: string;
  hasConsented: boolean;
  signature: string;
  files: Array<{name: string, path: string, type: string}>; // specific structure for stored files
  status: 'new' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface SponsorSubmission {
  id: string; // Made required
  orgName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  logoUrl?: string;
  status: 'new' | 'in_review' | 'contacted' | 'closed' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  token: string;
}

export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  PLAY_MOVIE = 'play',
  SUBMIT_CASTING = 'submit_casting',
  DONATE_CLICK = 'donate_click'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}