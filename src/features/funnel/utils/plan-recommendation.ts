import type { FunnelState, PlanType } from '../types/index';

export interface RecommendationResult {
  plan: PlanType;
  price: number | null;
  message: string;
  flags: string[];
}

// ==================== PLAN RECOMMENDATION ENGINE ====================

export function getPlanRecommendation(state: Partial<FunnelState>): RecommendationResult {
  const flags = detectManualReviewFlags(state);

  // If any manual review flags detected, return manual review plan
  if (flags.length > 0) {
    return {
      plan: 'manual_review',
      price: null,
      message: 'Your project requires custom scoping. Let\'s discuss details in a quick call.',
      flags,
    };
  }

  // Simple rule-based recommendation engine
  const projectType = state.projectType || state.q1_projectType;

  if (projectType === 'webapp') {
    return {
      plan: 'plan3',
      price: 3950,
      message: 'Business Platform Lite — Perfect for your custom app needs.',
      flags: [],
    };
  }

  if (projectType === 'ecommerce' || projectType === 'website_ecommerce') {
    return {
      plan: 'plan2',
      price: 1850,
      message: 'Online Store Launch — Everything you need to sell online.',
      flags: [],
    };
  }

  // Default to Plan 1 for landing/website/not_sure/other
  return {
    plan: 'plan1',
    price: 650,
    message: 'Starter Landing — Your online presence in 48 hours.',
    flags: [],
  };
}

// ==================== MANUAL REVIEW FLAG DETECTION ====================

export function detectManualReviewFlags(state: Partial<FunnelState>): string[] {
  const flags: string[] = [];

  // ---- Flag 1: Ecommerce - Product count exceeds 10 (EC12) ----
  if (state.ec12_productCount) {
    const productCount = parseProductCount(state.ec12_productCount);
    if (productCount > 10) {
      flags.push('ECOMMERCE_PRODUCT_COUNT_EXCEEDS_10');
    }
  }

  // ---- Flag 2: Web App - Multiple user roles (WA12 + WA13) ----
  if (state.wa13_requiresLogin === true) {
    if (state.wa12_users && state.wa12_users.length > 1) {
      flags.push('WEBAPP_MULTIPLE_USER_ROLES');
    }
  }

  // ---- Flag 3: Web App - Advanced automations (WA18) ----
  if (state.wa18_automations && state.wa18_automations.length > 2) {
    flags.push('WEBAPP_ADVANCED_AUTOMATIONS');
  }

  // ---- Flag 4: Budget below recommended plan (FQ1) ----
  const recommendedPrice = getPlanPrice(state);
  const budgetValue = parseBudget(state.fq1_budget);

  if (budgetValue > 0 && budgetValue < recommendedPrice) {
    flags.push('BUDGET_BELOW_RECOMMENDED_PLAN');
  }

  // ---- Flag 5: Project type undefined / Not sure (Q1) ----
  const projectType = state.projectType || state.q1_projectType;
  if (projectType === 'not_sure' || projectType === 'other') {
    // Check if goal is also ambiguous
    const goal = state.q2_goal || state.answers?.goal;
    if (!goal) {
      flags.push('PROJECT_TYPE_AND_GOAL_UNDEFINED');
    }
  }

  return flags;
}

// ==================== HELPER FUNCTIONS ====================

function parseProductCount(value: string | undefined): number {
  if (!value) return 0;

  switch (value) {
    case '1-5':
      return 5;
    case '6-10':
      return 10;
    case '11-50':
      return 50;
    case '50+':
      return 100;
    default:
      return parseInt(value) || 0;
  }
}

function parseBudget(value: string | undefined): number {
  if (!value) return 0;

  switch (value) {
    case 'under-1k':
      return 1000;
    case '1k-2k':
      return 2000;
    case '2k-5k':
      return 5000;
    case '5k-10k':
      return 10000;
    case '10k+':
      return 999999;
    case 'flexible':
      return 0; // Flexible means no hard budget constraint
    default:
      return 0;
  }
}

export function getPlanPrice(state: Partial<FunnelState>): number {
  const projectType = state.projectType || state.q1_projectType;

  if (projectType === 'webapp') {
    return 3950;
  }

  if (projectType === 'ecommerce' || projectType === 'website_ecommerce') {
    return 1850;
  }

  return 650; // Plan 1 default
}

// ==================== ADD-ON SUGGESTIONS ====================

export interface SuggestedAddon {
  id: string;
  name: string;
  price: number;
  reason: string;
}

export function getSuggestedAddOns(state: Partial<FunnelState>): SuggestedAddon[] {
  const suggested: SuggestedAddon[] = [];

  // Logo suggestion
  if (state.q5_hasLogo === false) {
    suggested.push({
      id: 'logo',
      name: 'Basic Logo',
      price: 150,
      reason: 'You mentioned not having a logo. We can design one for you.',
    });
  }

  // Images suggestion
  if (state.q7_hasImages === false) {
    suggested.push({
      id: 'ai-images',
      name: 'AI-Generated Images Pack',
      price: 75,
      reason: 'You don\'t have images yet. We can generate beautiful ones aligned to your style.',
    });
  }

  // Copywriting suggestion
  if (state.q8_hasCopy === false) {
    suggested.push({
      id: 'advanced-copywriting',
      name: 'Advanced Copywriting',
      price: 250,
      reason: 'Professional copy by a human copywriter (not just AI-generated).',
    });
  }

  // Domain suggestion
  if (state.q9_hasDomain === false) {
    suggested.push({
      id: 'domain-setup',
      name: 'Domain + Hosting Setup',
      price: 150,
      reason: 'We can handle your domain registration and hosting setup.',
    });
  }

  // Calendly integration suggestion (if landing page with appointment CTA)
  if (state.lp12_cta === 'Schedule appointment' && !state.answers?.hasCalendly) {
    suggested.push({
      id: 'calendly-integration',
      name: 'Calendly Integration',
      price: 75,
      reason: 'Embed scheduling directly on your landing page.',
    });
  }

  // Advanced forms suggestion (if diagnostic form requested)
  if (state.lp13_formType === 'diagnostic') {
    suggested.push({
      id: 'advanced-forms',
      name: 'Advanced Form',
      price: 150,
      reason: 'Create a custom diagnostic form with conditional logic.',
    });
  }

  // Simple automation suggestion (ecommerce or web app)
  if (
    (state.ec17_automatedEmails && state.ec17_automatedEmails.length > 0) ||
    (state.wa18_automations && state.wa18_automations.length > 0)
  ) {
    suggested.push({
      id: 'simple-automation',
      name: 'Simple Automation',
      price: 250,
      reason: 'Set up automated workflows and notifications.',
    });
  }

  return suggested;
}

// ==================== PRICE CALCULATION ====================

export interface PriceBreakdown {
  basePlan: number;
  addOns: number;
  total: number;
}

export function calculateTotalPrice(
  state: Partial<FunnelState>,
  selectedAddOns: Array<{ price: number }> = []
): PriceBreakdown {
  const basePlan = getPlanPrice(state);
  const addOns = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);

  return {
    basePlan,
    addOns,
    total: basePlan + addOns,
  };
}

// ==================== STEP VISIBILITY LOGIC ====================

export function getVisibleSteps(state: Partial<FunnelState>): string[] {
  const steps: string[] = [
    'welcome',
    'q1_projectType',
    'q2_goal',
    'q3_industry',
    'q4_visualStyle',
    'q4b_q4c_adjustments',
    'q5_q6_brandAssets',
    'q7_q8_contentAssets',
    'q9_q10_domainTimeline',
  ];

  // Determine branch and add branch-specific steps
  const projectType = state.projectType || state.q1_projectType;

  if (projectType === 'landing' || projectType === 'website' || projectType === 'other') {
    steps.push(
      'lp11_lp14_landingSpecifics'
    );
  } else if (projectType === 'ecommerce' || projectType === 'website_ecommerce') {
    steps.push(
      'ec11_ec18_ecommerceSpecifics'
    );
  } else if (projectType === 'webapp') {
    steps.push(
      'wa11_wa19_webAppSpecifics'
    );
  }

  // Final questions for all users
  steps.push(
    'fq1_budget',
    'fq3_preference',
    'fq4_contactInfo'
  );

  // Check for manual review flags
  const flags = detectManualReviewFlags(state);

  if (flags.length > 0) {
    // Manual review path: show schedule/contact page instead of summary
    steps.push('manualReviewScheduling');
  } else {
    // Standard path: show summary with add-ons
    steps.push('summary');
  }

  return steps;
}

// ==================== BRANCH DETERMINATION ====================

export function determineBranch(projectType: string | undefined): 'landing' | 'ecommerce' | 'webapp' | null {
  if (projectType === 'webapp') {
    return 'webapp';
  }
  if (projectType === 'ecommerce' || projectType === 'website_ecommerce') {
    return 'ecommerce';
  }
  if (projectType === 'landing' || projectType === 'website' || projectType === 'other') {
    return 'landing';
  }
  return null;
}
