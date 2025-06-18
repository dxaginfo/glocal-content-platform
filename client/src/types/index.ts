// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  TRANSLATOR = 'TRANSLATOR',
  VIEWER = 'VIEWER',
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Content related types
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  body: string;
  status: ContentStatus;
  type: ContentType;
  language: string;
  locale: string;
  tags: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  originalId?: string; // Reference to the original content if this is a translation
  translations?: Translation[];
  metadata?: Record<string, any>;
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ContentType {
  PAGE = 'PAGE',
  BLOG_POST = 'BLOG_POST',
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  LANDING_PAGE = 'LANDING_PAGE',
  PRESS_RELEASE = 'PRESS_RELEASE',
  CUSTOM = 'CUSTOM',
}

// Translation related types
export interface Translation {
  id: string;
  contentId: string;
  language: string;
  locale: string;
  status: TranslationStatus;
  translator?: User;
  translatedFields: {
    title?: string;
    description?: string;
    body?: string;
    metadata?: Record<string, any>;
  };
  createdAt: string;
  updatedAt: string;
}

export enum TranslationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
}

// Language and locale related types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  locales: Locale[];
}

export interface Locale {
  code: string;
  name: string;
  countryCode: string;
  countryName: string;
}

// Analytics related types
export interface ContentAnalytics {
  contentId: string;
  views: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  byLanguage: {
    language: string;
    locale: string;
    views: number;
    uniqueViews: number;
  }[];
  byCountry: {
    countryCode: string;
    countryName: string;
    views: number;
    uniqueViews: number;
  }[];
  byDevice: {
    deviceType: string;
    views: number;
    uniqueViews: number;
  }[];
  period: string;
  startDate: string;
  endDate: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and query params
export interface ContentQueryParams {
  search?: string;
  type?: ContentType;
  status?: ContentStatus;
  language?: string;
  locale?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}