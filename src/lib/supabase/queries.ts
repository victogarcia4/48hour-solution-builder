import { createClient } from './server';
import type { FunnelState, SelectedAddon } from '@/features/funnel/types';

export interface SaveFunnelResult {
  leadId: string;
  success: boolean;
  error?: string;
}

/**
 * Save complete funnel state and selected add-ons to Supabase
 * This is the primary function for persisting funnel data after completion
 */
export async function saveFunnelWithAddOns(
  state: FunnelState,
  selectedAddOns: SelectedAddon[] = []
): Promise<SaveFunnelResult> {
  try {
    const supabase = await createClient();

    // Prepare the lead data
    const leadData = {
      // Contact info
      name: state.contact.name,
      email: state.contact.email,
      business_name: state.contact.businessName,
      // contact_phone: state.contact.phone || null, // TODO: Add to Supabase schema

      // Base questions (Q1-Q10)
      q1_project_type: state.projectType,
      q2_goal: state.q2_goal || null,
      q3_industry: state.q3_industry || null,
      q4_visual_style: state.q4_visualStyle || null,
      q4b_style_tone: state.q4b_styleTone || null,
      q4c_color_preference: state.q4c_colorPreference || null,
      q5_has_logo: state.q5_hasLogo ?? null,
      q6_brand_colors: state.q6_brandColors || [],
      q7_has_images: state.q7_hasImages ?? null,
      q8_has_copy: state.q8_hasCopy ?? null,
      q9_has_domain: state.q9_hasDomain ?? null,
      q10_launch_timeline: state.q10_launchTimeline || null,

      // Landing Page Branch (Q11-Q14)
      lp11_sections: state.lp11_sections || [],
      lp12_cta: state.lp12_cta || null,
      lp13_form_type: state.lp13_formType || null,
      lp14_references: state.lp14_references || null,

      // Ecommerce Branch (Q11-Q18)
      ec11_what_to_sell: state.ec11_whatToSell || null,
      ec12_product_count: state.ec12_productCount || null,
      ec13_prices_defined: state.ec13_pricesDefined ?? null,
      ec14_payment_method: state.ec14_paymentMethod || null,
      ec15_shipping: state.ec15_shipping ?? null,
      ec16_inventory: state.ec16_inventory ?? null,
      ec17_automated_emails: state.ec17_automatedEmails || [],
      ec18_language: state.ec18_language || null,

      // Web App Branch (Q11-Q19)
      wa11_app_type: state.wa11_appType || null,
      wa12_users: state.wa12_users || [],
      wa13_requires_login: state.wa13_requiresLogin ?? null,
      wa14_data_to_store: state.wa14_dataToStore || [],
      wa15_needs_dashboard: state.wa15_needsDashboard ?? null,
      wa16_app_actions: state.wa16_appActions || [],
      wa17_data_destination: state.wa17_dataDestination || [],
      wa18_automations: state.wa18_automations || [],
      wa19_urgency: state.wa19_urgency || null,

      // Final Questions (FQ1-FQ3)
      fq1_budget: state.fq1_budget || null,
      fq3_preference: state.fq3_preference || null,

      // Computed fields
      recommended_plan: state.recommendedPlan || null,
      estimated_price: state.recommendedPrice || 0,
      estimated_addon_price: calculateAddOnTotal(selectedAddOns),
      manual_review_flags: state.manualReviewFlags || [],
      requires_manual_review: state.requiresManualReview ?? false,
      // branch: determineBranchFromProjectType(state.projectType), // TODO: Add branch column to Supabase schema

      // Timestamps
      started_at: state.startedAt,
      completed_at: new Date(),
    };

    // Insert the main lead record
    const { data: lead, error: leadError } = await supabase
      .from('funnel_leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) {
      console.error('Error saving funnel lead:', leadError);
      return {
        leadId: '',
        success: false,
        error: `Failed to save lead: ${leadError.message}`,
      };
    }

    if (!lead) {
      return {
        leadId: '',
        success: false,
        error: 'Lead insertion returned no data',
      };
    }

    // Save selected add-ons if any
    if (selectedAddOns.length > 0) {
      const addonRecords = selectedAddOns.map((addon) => ({
        funnel_lead_id: lead.id,
        addon_id: addon.id,
        addon_name: addon.name,
        price: addon.price,
      }));

      const { error: addonsError } = await supabase
        .from('funnel_add_ons')
        .insert(addonRecords);

      if (addonsError) {
        console.error('Error saving add-ons:', addonsError);
        // Still return success for the lead, but log the add-ons error
        return {
          leadId: lead.id,
          success: true,
          error: `Lead saved but add-ons failed: ${addonsError.message}`,
        };
      }
    }

    return {
      leadId: lead.id,
      success: true,
    };
  } catch (error) {
    console.error('Unexpected error saving funnel:', error);
    return {
      leadId: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Retrieve a complete funnel lead with its add-ons
 */
export async function getFunnelLead(leadId: string) {
  try {
    const supabase = await createClient();

    const { data: lead, error: leadError } = await supabase
      .from('funnel_leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError) {
      console.error('Error retrieving lead:', leadError);
      return { lead: null, addOns: [] };
    }

    const { data: addOns, error: addOnsError } = await supabase
      .from('funnel_add_ons')
      .select('*')
      .eq('funnel_lead_id', leadId);

    if (addOnsError) {
      console.error('Error retrieving add-ons:', addOnsError);
      return { lead, addOns: [] };
    }

    return { lead, addOns: addOns || [] };
  } catch (error) {
    console.error('Unexpected error retrieving lead:', error);
    return { lead: null, addOns: [] };
  }
}

/**
 * Get all funnel leads with manual review flag
 */
export async function getManualReviewLeads() {
  try {
    const supabase = await createClient();

    const { data: leads, error } = await supabase
      .from('funnel_leads')
      .select('*')
      .eq('requires_manual_review', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error retrieving manual review leads:', error);
      return [];
    }

    return leads || [];
  } catch (error) {
    console.error('Unexpected error retrieving manual review leads:', error);
    return [];
  }
}

/**
 * Get funnel leads filtered by branch
 */
export async function getFunnelLeadsByBranch(branch: 'landing' | 'ecommerce' | 'webapp') {
  try {
    const supabase = await createClient();

    const { data: leads, error } = await supabase
      .from('funnel_leads')
      .select('*')
      .eq('branch', branch)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error retrieving ${branch} leads:`, error);
      return [];
    }

    return leads || [];
  } catch (error) {
    console.error(`Unexpected error retrieving ${branch} leads:`, error);
    return [];
  }
}

// ==================== HELPER FUNCTIONS ====================

function calculateAddOnTotal(selectedAddOns: SelectedAddon[]): number {
  return selectedAddOns.reduce((total, addon) => total + addon.price, 0);
}

function determineBranchFromProjectType(projectType: string | null): string | null {
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
