import type { FunnelState } from '../types/index';

// ==================== BASE QUESTIONS (Q1-Q10) ====================

export const INDUSTRIES = [
  'Fitness / personal training',
  'Health / wellness',
  'Education / training',
  'Beauty / aesthetics',
  'Food / restaurant',
  'Construction / contractors',
  'Cleaning services',
  'Consulting / coaching',
  'Real estate',
  'Professional services',
  'Retail',
  'Nonprofit',
  'Other'
];

export const GOALS = [
  'Capture leads',
  'Sell products or services online',
  'Schedule appointments',
  'Show portfolio',
  'Promote a personal brand',
  'Automate a process',
  'Organize clients or prospects',
  'Validate an idea quickly',
  'Other'
];

export const PROJECT_TYPES = [
  { id: 'landing', label: 'Landing page' },
  { id: 'website', label: 'Website for a business or service' },
  { id: 'ecommerce', label: 'Online store / ecommerce' },
  { id: 'website_ecommerce', label: 'Website + ecommerce' },
  { id: 'mini_app', label: 'Web or mobile mini app' },
  { id: 'webapp', label: 'Website + ecommerce + custom web app' },
  { id: 'not_sure', label: 'I am not sure' },
  { id: 'other', label: 'Other' }
];

// ==================== VISUAL STYLES (Q4) ====================

export const VISUAL_STYLES = [
  {
    id: 'modern-clean',
    name: 'Modern & Clean',
    description: 'Professional, clear, trustworthy',
    colors: ['#FFFFFF', '#1E3A8A', '#38BDF8', '#10B981'],
    fonts: 'Inter, Manrope, Open Sans',
  },
  {
    id: 'bold-disruptive',
    name: 'Bold & Disruptive',
    description: 'Energetic, memorable, high contrast',
    colors: ['#0A0A0A', '#FACC15', '#7C3AED', '#06B6D4'],
    fonts: 'Space Grotesk, Bebas, Anton',
  },
  {
    id: 'premium-luxury',
    name: 'Premium & Luxury',
    description: 'Elegant, exclusive, sophisticated',
    colors: ['#1A1A1A', '#F5F0E8', '#C9A96E', '#8B7355'],
    fonts: 'Cormorant, Playfair, Didact',
  },
  {
    id: 'minimalistic',
    name: 'Minimalistic',
    description: 'Simple, clean, maximum white space',
    colors: ['#FAFAFA', '#111111', '#E5E5E5'],
    fonts: 'DM Sans, Neue Haas, Lato',
  },
];

// ==================== STYLE TONE ADJUSTMENTS (Q4B) ====================

export const STYLE_TONES = [
  { id: 'warm', label: 'Warmer, friendlier' },
  { id: 'cool', label: 'Cooler, more technical' },
  { id: 'neutral', label: 'Keep it neutral' },
];

// ==================== LANDING PAGE SPECIFICS (Q11-Q14) ====================

export const LANDING_SECTIONS = [
  'Hero/Header',
  'About/Intro',
  'Services/Features (3+ items)',
  'How it works / Process',
  'Testimonials / Social proof',
  'Pricing',
  'FAQ',
  'Newsletter signup',
  'Contact form',
  'Gallery/Showcase'
];

export const LANDING_CTAs = [
  'Schedule appointment',
  'Get in touch / Contact us',
  'Start free trial',
  'Buy now',
  'Download',
  'Book consultation',
  'Learn more / Explore'
];

export const LANDING_FORM_TYPES = [
  { id: 'simple', label: 'Simple contact form (name, email, message)' },
  { id: 'diagnostic', label: 'Diagnostic form (questions to qualify leads)' },
  { id: 'appointments', label: 'Appointment/booking form' },
  { id: 'none', label: 'No form needed' }
];

// ==================== ECOMMERCE SPECIFICS (Q11-Q18) ====================

export const ECOMMERCE_WHAT_TO_SELL = [
  'Physical products',
  'Digital products / Downloads',
  'Services / Packages',
  'Memberships / Subscriptions',
  'Courses / Training',
  'Mix of above'
];

export const ECOMMERCE_PRODUCT_COUNT_OPTIONS = [
  { id: '1-5', label: '1 to 5 products', value: 5 },
  { id: '6-10', label: '6 to 10 products', value: 10 },
  { id: '11-50', label: '11 to 50 products', value: 50 },
  { id: '50+', label: 'More than 50 products', value: 100 }
];

export const PAYMENT_METHODS = [
  'Stripe',
  'PayPal',
  'Square',
  'Custom pricing (ask for quote)',
  'Multiple methods'
];

export const ECOMMERCE_LANGUAGES = [
  { id: 'en', label: 'English only' },
  { id: 'es', label: 'Spanish only' },
  { id: 'en-es', label: 'Bilingual (EN/ES)' },
  { id: 'other', label: 'Other language' }
];

// ==================== MINI APP SPECIFICS (Q11-Q16) ====================

export const MINI_APP_TYPES = [
  'Chat or messaging interface',
  'Task / project tracker',
  'Data dashboard',
  'Internal tool or admin panel',
  'Lead capture system',
  'Booking / scheduling app',
  'Other'
];

export const MINI_APP_USERS = [
  'Just me (owner/admin only)',
  'My team (internal users)',
  'Clients or customers (external users)',
  'Mixed (internal + external)'
];

export const MINI_APP_FEATURES = [
  'User authentication (login/signup)',
  'Create / edit / delete records',
  'File or image upload',
  'Search and filtering',
  'Email notifications',
  'Payment processing',
  'Export data (CSV / PDF)',
  'Real-time updates'
];

export const MINI_APP_INTEGRATIONS = [
  'Email (Resend / SMTP)',
  'Stripe / PayPal',
  'Google Sheets',
  'Calendly / Scheduling',
  'Slack',
  'Zapier / Make',
  'None needed'
];

// ==================== WEB APP SPECIFICS (Q11-Q19) ====================

export const WEB_APP_TYPES = [
  'Mini CRM (manage contacts/leads)',
  'Tracker (track metrics/progress)',
  'Client portal (document sharing)',
  'Dashboard (analytics/reporting)',
  'Workflow automation (process automation)',
  'Other'
];

export const WEB_APP_USERS = [
  'Just me (owner/admin only)',
  'My team (multiple users, same role)',
  'Clients (external users)',
  'Mixed (team + clients with different roles)'
];

export const WEB_APP_DATA_STORAGE = [
  'Contact information',
  'Project/task data',
  'Documents / Files',
  'Metrics / Analytics',
  'Customer information',
  'Inventory / Stock',
  'Appointment / Booking data',
  'Financial / Transaction data'
];

export const WEB_APP_ACTIONS = [
  'Create / Edit records',
  'Export data (CSV / PDF)',
  'Approve / Reject actions',
  'Send automated emails',
  'Generate reports',
  'Bulk import data',
  'Other'
];

export const WEB_APP_DATA_DESTINATIONS = [
  'Google Sheets',
  'Airtable',
  'Salesforce / CRM',
  'Email notification',
  'Slack',
  'Zapier / Automation tool',
  'Database (no export)'
];

export const WEB_APP_AUTOMATIONS = [
  'Email notifications',
  'Slack messages',
  'Calendar invites',
  'Data syncing between platforms',
  'Scheduled reports',
  'Approval workflows'
];

export const WEB_APP_URGENCY_OPTIONS = [
  { id: 'asap', label: 'ASAP - Critical for my business' },
  { id: 'within-2-weeks', label: 'Within 2 weeks' },
  { id: 'next-month', label: 'Next month is fine' },
  { id: 'flexible', label: 'I can wait - not urgent' }
];

// ==================== FINAL QUESTIONS (FQ1-FQ3) ====================

export const BUDGET_OPTIONS = [
  { id: 'under-1k', label: 'Under $1,000', value: 1000 },
  { id: '1k-2k', label: '$1,000 - $2,000', value: 2000 },
  { id: '2k-5k', label: '$2,000 - $5,000', value: 5000 },
  { id: '5k-10k', label: '$5,000 - $10,000', value: 10000 },
  { id: '10k+', label: '$10,000+', value: 999999 },
  { id: 'flexible', label: 'Flexible - what do you recommend?', value: 0 }
];

export const CONTINUATION_PREFERENCES = [
  { id: 'start_now', label: 'Start building now' },
  { id: 'quick_call', label: 'Schedule a quick call' },
  { id: 'send_summary', label: 'Send me the summary' }
];

// ==================== ADD-ONS CATALOG ====================

export const ADDON_CATALOG = [
  {
    id: 'logo',
    name: 'Basic Logo',
    price: 150,
    description: 'Custom logo design',
    suggestedIf: (state: Partial<FunnelState>) => !state.q5_hasLogo,
    category: 'branding'
  },
  {
    id: 'advanced-copywriting',
    name: 'Advanced Copywriting',
    price: 250,
    description: 'Professional human-written copy',
    suggestedIf: (state: Partial<FunnelState>) => !state.q8_hasCopy,
    category: 'content'
  },
  {
    id: 'ai-images',
    name: 'AI-Generated Images Pack',
    price: 150,
    description: 'Set of AI-generated images aligned to your style',
    suggestedIf: (state: Partial<FunnelState>) => !state.q7_hasImages,
    category: 'assets'
  },
  {
    id: 'domain-setup',
    name: 'Domain + Hosting Setup',
    price: 150,
    description: 'Domain registration and hosting configuration',
    suggestedIf: (state: Partial<FunnelState>) => !state.q9_hasDomain,
    category: 'infrastructure'
  },
  {
    id: 'additional-pages',
    name: 'Additional Pages',
    price: 200,
    description: 'Extra pages beyond the plan base',
    suggestedIf: () => false,
    category: 'expansion'
  },
  {
    id: 'additional-products',
    name: 'Additional Products (per unit)',
    price: 15,
    description: 'Each product beyond the 10-product limit',
    suggestedIf: () => false,
    category: 'expansion'
  },
  {
    id: 'advanced-forms',
    name: 'Advanced Form',
    price: 150,
    description: 'Diagnostic or conditional logic forms',
    suggestedIf: () => false,
    category: 'functionality'
  },
  {
    id: 'simple-automation',
    name: 'Simple Automation',
    price: 250,
    description: 'Automated emails, notifications, or Zapier flows',
    suggestedIf: () => false,
    category: 'automation'
  },
  {
    id: 'calendly-integration',
    name: 'Calendly Integration',
    price: 150,
    description: 'Embedded scheduling system',
    suggestedIf: () => false,
    category: 'integrations'
  },
  {
    id: 'whatsapp-integration',
    name: 'WhatsApp Integration',
    price: 150,
    description: 'WhatsApp button and messaging',
    suggestedIf: () => false,
    category: 'integrations'
  },
  {
    id: 'email-marketing-setup',
    name: 'Email Marketing Setup',
    price: 200,
    description: 'Mailchimp/Brevo integration and templates',
    suggestedIf: () => false,
    category: 'integrations'
  },
  {
    id: 'chatbot',
    name: 'Basic Chatbot',
    price: 350,
    description: 'FAQ or automated response chatbot',
    suggestedIf: () => false,
    category: 'ai'
  }
];
