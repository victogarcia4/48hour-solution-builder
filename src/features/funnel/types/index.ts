export type ProjectType = 'landing' | 'website' | 'ecommerce' | 'website_ecommerce' | 'webapp' | 'not_sure' | 'other';
export type PlanType = 'plan1' | 'plan2' | 'plan3' | 'manual_review';
export type WizardBranch = 'landing' | 'ecommerce' | 'webapp';

export interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  businessName: string;
}

export interface SelectedAddon {
  id: string;
  name: string;
  price: number;
}

export type FunnelState = {
  // Navigation & Metadata
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  startedAt: Date;
  completedAt?: Date;
  branch?: WizardBranch;

  // Base Questions (Q1-Q10) - Asked of all users
  projectType: ProjectType | null;
  q1_projectType?: string;
  q2_goal?: string;
  q3_industry?: string;
  q4_visualStyle?: string;
  q4b_styleTone?: string;
  q4c_colorPreference?: string;
  q5_hasLogo?: boolean;
  q6_brandColors?: string[];
  q7_hasImages?: boolean;
  q8_hasCopy?: boolean;
  q9_hasDomain?: boolean;
  q10_launchTimeline?: string;

  // Landing Page Branch (Q11-Q14) - Conditional
  lp11_sections?: string[];
  lp12_cta?: string;
  lp13_formType?: string;
  lp14_references?: string;

  // Ecommerce Branch (Q11-Q18) - Conditional
  ec11_whatToSell?: string;
  ec12_productCount?: string;
  ec13_pricesDefined?: boolean;
  ec14_paymentMethod?: string;
  ec15_shipping?: boolean;
  ec16_inventory?: boolean;
  ec17_automatedEmails?: string[];
  ec18_language?: string;

  // Web App Branch (Q11-Q19) - Conditional
  wa11_appType?: string;
  wa12_users?: string[];
  wa13_requiresLogin?: boolean;
  wa14_dataToStore?: string[];
  wa15_needsDashboard?: boolean;
  wa16_appActions?: string[];
  wa17_dataDestination?: string[];
  wa18_automations?: string[];
  wa19_urgency?: string;

  // Final Questions (FQ1-FQ3)
  fq1_budget?: string;
  fq3_preference?: 'start_now' | 'quick_call' | 'send_summary';

  // Contact Information (FQ4)
  contact: ContactInfo;

  // Computed / Recommendation Fields
  recommendedPlan?: PlanType;
  recommendedPrice?: number;
  estimatedAddOnPrice?: number;
  selectedAddOns?: SelectedAddon[];

  // Manual Review Logic
  manualReviewFlags?: string[];
  requiresManualReview?: boolean;

  // Legacy compatibility - generic answers object
  answers?: Record<string, any>;
};

export type VisualStyle = {
  id: string;
  name: string;
  description: string;
  colors: string[];
  fonts: string;
};
