/**
 * TypeScript типы для платформы подбора психологов
 */

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  language: 'ru' | 'ua' | 'en';
  timezone: string;
  createdAt: Date;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  gender?: 'male' | 'female' | 'other';
  issues: string[]; // ADHD, OCD, anxiety, trauma, motivation, gaming_addiction
  preferences: {
    approach?: ('CBT' | 'EMDR' | 'Gestalt' | 'Psychoanalysis')[];
    format: 'online' | 'offline' | 'both';
    language: ('ru' | 'ua' | 'en')[];
  };
}

export interface Application {
  id: string;
  parentId: string;
  childId: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  availableSlots: TimeSlot[];
  urgency: 'low' | 'medium' | 'high';
  notes: string;
  createdAt: Date;
  status: 'pending' | 'processing' | 'matched' | 'completed' | 'cancelled';
}

export interface TimeSlot {
  day: string; // Monday, Tuesday, etc.
  timeStart: string; // "14:00"
  timeEnd: string; // "18:00"
}

export interface Provider {
  id: string;
  name: string;
  languages: string[];
  approaches: string[]; // CBT, EMDR, Gestalt, etc.
  specializations: string[]; // anxiety, depression, trauma, ADHD, etc.
  ageGroups: string[]; // teens, adults, children, families
  price: {
    amount: number;
    currency: string;
  };
  rating: number; // 0-5
  reviewsCount: number;
  verified: boolean;
  certifications: string[];
  associations: string[]; // EABCT, УАКПТ, etc.
  contacts: {
    email: string;
    phone: string;
    telegram?: string;
    whatsapp?: string;
  };
  availability: TimeSlot[];
  format: 'online' | 'offline' | 'both';
  location?: string;
  experience: number; // years
  education: string;
  bio: string;
}

export interface Match {
  id: string;
  applicationId: string;
  providerId: string;
  score: number; // 0-100
  rank: number; // 1-10
  status: 'suggested' | 'contacted' | 'responded' | 'accepted' | 'rejected' | 'expired';
  contactedAt?: Date;
  respondedAt?: Date;
  notes?: string;
}

export interface Session {
  id: string;
  matchId: string;
  scheduledAt: Date;
  duration: number; // minutes
  channel: 'zoom' | 'google_meet' | 'telegram' | 'offline';
  meetingUrl?: string;
  calendarEventId?: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  completedAt?: Date;
}

export interface Feedback {
  id: string;
  sessionId: string;
  providerId: string;
  nps: number; // 0-10
  csat: number; // 1-5
  comments: string;
  wouldRecommend: boolean;
  createdAt: Date;
}

export interface Config {
  weights: {
    language: number;
    cbt: number;
    price: number;
    rating: number;
    verified: number;
    experience: number;
  };
  requiredFilters: {
    ageGroup: string;
    minRating: number;
  };
  emailTemplates: {
    [key: string]: EmailTemplate;
  };
  asana: {
    taskId: string;
    workspaceGid: string;
    customFieldsMap: {
      [key: string]: string;
    };
  };
  featureFlags: {
    autoEmail: boolean;
    telegram: boolean;
    payments: boolean;
  };
}

export interface EmailTemplate {
  subject: string;
  body: string;
  variables: string[];
}

export interface ScoringResult {
  provider: Provider;
  score: number;
  breakdown: {
    language: number;
    approach: number;
    price: number;
    rating: number;
    verified: number;
    experience: number;
  };
}
