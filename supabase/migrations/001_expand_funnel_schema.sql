-- Migration: Expand funnel_leads table with all 30+ questions and create add-ons table
-- This migration extends the existing funnel_leads table to support the complete questionnaire

-- ==================== EXTEND EXISTING FUNNEL_LEADS TABLE ====================

ALTER TABLE funnel_leads
ADD COLUMN IF NOT EXISTS q1_project_type TEXT,
ADD COLUMN IF NOT EXISTS q2_goal TEXT,
ADD COLUMN IF NOT EXISTS q3_industry TEXT,
ADD COLUMN IF NOT EXISTS q4_visual_style TEXT,
ADD COLUMN IF NOT EXISTS q4b_style_tone TEXT,
ADD COLUMN IF NOT EXISTS q4c_color_preference TEXT,
ADD COLUMN IF NOT EXISTS q5_has_logo BOOLEAN,
ADD COLUMN IF NOT EXISTS q6_brand_colors TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS q7_has_images BOOLEAN,
ADD COLUMN IF NOT EXISTS q8_has_copy BOOLEAN,
ADD COLUMN IF NOT EXISTS q9_has_domain BOOLEAN,
ADD COLUMN IF NOT EXISTS q10_launch_timeline TEXT,

-- Landing Page Branch (Q11-Q14, optional)
ADD COLUMN IF NOT EXISTS lp11_sections TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS lp12_cta TEXT,
ADD COLUMN IF NOT EXISTS lp13_form_type TEXT,
ADD COLUMN IF NOT EXISTS lp14_references TEXT,

-- Ecommerce Branch (Q11-Q18, optional)
ADD COLUMN IF NOT EXISTS ec11_what_to_sell TEXT,
ADD COLUMN IF NOT EXISTS ec12_product_count TEXT,
ADD COLUMN IF NOT EXISTS ec13_prices_defined BOOLEAN,
ADD COLUMN IF NOT EXISTS ec14_payment_method TEXT,
ADD COLUMN IF NOT EXISTS ec15_shipping BOOLEAN,
ADD COLUMN IF NOT EXISTS ec16_inventory BOOLEAN,
ADD COLUMN IF NOT EXISTS ec17_automated_emails TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS ec18_language TEXT,

-- Web App Branch (Q11-Q19, optional)
ADD COLUMN IF NOT EXISTS wa11_app_type TEXT,
ADD COLUMN IF NOT EXISTS wa12_users TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS wa13_requires_login BOOLEAN,
ADD COLUMN IF NOT EXISTS wa14_data_to_store TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS wa15_needs_dashboard BOOLEAN,
ADD COLUMN IF NOT EXISTS wa16_app_actions TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS wa17_data_destination TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS wa18_automations TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS wa19_urgency TEXT,

-- Final Questions (FQ1-FQ3)
ADD COLUMN IF NOT EXISTS fq1_budget TEXT,
ADD COLUMN IF NOT EXISTS fq3_preference TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,

-- Computed & Metadata
ADD COLUMN IF NOT EXISTS recommended_plan TEXT,
ADD COLUMN IF NOT EXISTS estimated_addon_price INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS manual_review_flags TEXT[] DEFAULT '{}'::TEXT[],
ADD COLUMN IF NOT EXISTS requires_manual_review BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS branch TEXT,
ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

-- ==================== CREATE ADD-ONS TRACKING TABLE ====================

CREATE TABLE IF NOT EXISTS funnel_add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_lead_id UUID NOT NULL REFERENCES funnel_leads(id) ON DELETE CASCADE,
  addon_id TEXT NOT NULL,
  addon_name TEXT NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_funnel_add_ons_lead_id ON funnel_add_ons(funnel_lead_id);
CREATE INDEX IF NOT EXISTS idx_funnel_leads_requires_manual_review ON funnel_leads(requires_manual_review);
CREATE INDEX IF NOT EXISTS idx_funnel_leads_branch ON funnel_leads(branch);

-- ==================== COMMENTS FOR DOCUMENTATION ====================

COMMENT ON TABLE funnel_leads IS 'Main table for capturing funnel leads with all questionnaire answers';
COMMENT ON TABLE funnel_add_ons IS 'Junction table tracking selected add-ons for each funnel lead';

COMMENT ON COLUMN funnel_leads.q1_project_type IS 'Project type: landing, website, ecommerce, website_ecommerce, webapp, not_sure, other';
COMMENT ON COLUMN funnel_leads.manual_review_flags IS 'Array of flag codes that triggered manual review (e.g., PRODUCT_COUNT_EXCEEDS_10)';
COMMENT ON COLUMN funnel_leads.requires_manual_review IS 'Boolean: true if project needs manual review instead of auto-quote';
COMMENT ON COLUMN funnel_leads.branch IS 'Derived from q1_project_type: landing, ecommerce, or webapp';
