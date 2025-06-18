// API configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Authentication
export const TOKEN_KEY = 'token';
export const TOKEN_EXPIRATION_KEY = 'token_expiration';

// Content
export const CONTENT_PER_PAGE = 10;
export const TRANSLATIONS_PER_PAGE = 10;

// Supported languages (ISO 639-1 codes)
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', isRTL: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', isRTL: false },
  { code: 'fr', name: 'French', nativeName: 'Français', isRTL: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', isRTL: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', isRTL: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', isRTL: false },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', isRTL: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', isRTL: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', isRTL: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', isRTL: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', isRTL: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isRTL: false },
];

// Supported locales (ISO 3166-1 alpha-2 country codes)
export const SUPPORTED_LOCALES = [
  { code: 'en-US', name: 'English (United States)', countryCode: 'US', countryName: 'United States' },
  { code: 'en-GB', name: 'English (United Kingdom)', countryCode: 'GB', countryName: 'United Kingdom' },
  { code: 'en-CA', name: 'English (Canada)', countryCode: 'CA', countryName: 'Canada' },
  { code: 'en-AU', name: 'English (Australia)', countryCode: 'AU', countryName: 'Australia' },
  { code: 'fr-FR', name: 'French (France)', countryCode: 'FR', countryName: 'France' },
  { code: 'fr-CA', name: 'French (Canada)', countryCode: 'CA', countryName: 'Canada' },
  { code: 'fr-BE', name: 'French (Belgium)', countryCode: 'BE', countryName: 'Belgium' },
  { code: 'es-ES', name: 'Spanish (Spain)', countryCode: 'ES', countryName: 'Spain' },
  { code: 'es-MX', name: 'Spanish (Mexico)', countryCode: 'MX', countryName: 'Mexico' },
  { code: 'es-AR', name: 'Spanish (Argentina)', countryCode: 'AR', countryName: 'Argentina' },
  { code: 'es-CO', name: 'Spanish (Colombia)', countryCode: 'CO', countryName: 'Colombia' },
  { code: 'de-DE', name: 'German (Germany)', countryCode: 'DE', countryName: 'Germany' },
  { code: 'de-AT', name: 'German (Austria)', countryCode: 'AT', countryName: 'Austria' },
  { code: 'de-CH', name: 'German (Switzerland)', countryCode: 'CH', countryName: 'Switzerland' },
  { code: 'it-IT', name: 'Italian (Italy)', countryCode: 'IT', countryName: 'Italy' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', countryCode: 'BR', countryName: 'Brazil' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', countryCode: 'PT', countryName: 'Portugal' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)', countryCode: 'NL', countryName: 'Netherlands' },
  { code: 'nl-BE', name: 'Dutch (Belgium)', countryCode: 'BE', countryName: 'Belgium' },
  { code: 'ru-RU', name: 'Russian (Russia)', countryCode: 'RU', countryName: 'Russia' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', countryCode: 'CN', countryName: 'China' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', countryCode: 'TW', countryName: 'Taiwan' },
  { code: 'ja-JP', name: 'Japanese (Japan)', countryCode: 'JP', countryName: 'Japan' },
  { code: 'ko-KR', name: 'Korean (South Korea)', countryCode: 'KR', countryName: 'South Korea' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', countryCode: 'SA', countryName: 'Saudi Arabia' },
  { code: 'ar-EG', name: 'Arabic (Egypt)', countryCode: 'EG', countryName: 'Egypt' },
  { code: 'hi-IN', name: 'Hindi (India)', countryCode: 'IN', countryName: 'India' },
];

// Default language and locale
export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_LOCALE = 'en-US';

// Content types with display names
export const CONTENT_TYPES = [
  { value: 'PAGE', label: 'Page' },
  { value: 'BLOG_POST', label: 'Blog Post' },
  { value: 'PRODUCT', label: 'Product' },
  { value: 'CATEGORY', label: 'Category' },
  { value: 'LANDING_PAGE', label: 'Landing Page' },
  { value: 'PRESS_RELEASE', label: 'Press Release' },
  { value: 'CUSTOM', label: 'Custom' },
];

// Content statuses with display names and colors
export const CONTENT_STATUSES = [
  { value: 'DRAFT', label: 'Draft', color: 'gray' },
  { value: 'REVIEW', label: 'Review', color: 'yellow' },
  { value: 'PUBLISHED', label: 'Published', color: 'green' },
  { value: 'ARCHIVED', label: 'Archived', color: 'red' },
];

// Translation statuses with display names and colors
export const TRANSLATION_STATUSES = [
  { value: 'NOT_STARTED', label: 'Not Started', color: 'gray' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'blue' },
  { value: 'REVIEW', label: 'Review', color: 'yellow' },
  { value: 'COMPLETED', label: 'Completed', color: 'green' },
];

// User roles with display names and permissions
export const USER_ROLES = [
  { 
    value: 'ADMIN', 
    label: 'Administrator',
    permissions: ['create_content', 'edit_content', 'delete_content', 'publish_content', 'manage_users', 'manage_settings'] 
  },
  { 
    value: 'EDITOR', 
    label: 'Editor',
    permissions: ['create_content', 'edit_content', 'delete_content', 'publish_content'] 
  },
  { 
    value: 'TRANSLATOR', 
    label: 'Translator',
    permissions: ['edit_translations'] 
  },
  { 
    value: 'VIEWER', 
    label: 'Viewer',
    permissions: ['view_content'] 
  },
];