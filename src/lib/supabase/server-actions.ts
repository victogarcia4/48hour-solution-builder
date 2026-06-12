'use server';

import { createClient } from './server';
import type { FunnelState, SelectedAddon } from '@/features/funnel/types';
import { sendEmail } from '@/features/email/services/email-service';
import { NOTIFY_EMAIL, SITE_URL } from '@/shared/lib/resend';
import { contactAutoReplyHtml } from '@/features/email/templates/contactAutoReply';
import { contactNotificationHtml } from '@/features/email/templates/contactNotification';
import { funnelLeadNotificationHtml } from '@/features/email/templates/funnelLeadNotification';

export interface SaveFunnelResult {
  leadId: string;
  success: boolean;
  error?: string;
}

export async function saveFunnelWithAddOnsAction(
  state: FunnelState,
  selectedAddOns: SelectedAddon[] = []
): Promise<SaveFunnelResult> {
  try {
    const supabase = await createClient();

    // Prepare the lead data with camelCase to snake_case conversion
    const leadData = {
      // Contact info
      name: state.contact.name,
      email: state.contact.email,
      business_name: state.contact.businessName,
      // contact_phone: state.contact.phone || null, // TODO: Add to Supabase schema

      // Base questions (Q1-Q10)
      q1_project_type: state.projectType || state.q1_projectType,
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

      // Final questions
      fq1_budget: state.fq1_budget || null,
      fq3_preference: state.fq3_preference || null,

      // Computed fields
      recommended_plan: state.recommendedPlan || null,
      estimated_addon_price: state.estimatedAddOnPrice || 0,
      manual_review_flags: state.manualReviewFlags || [],
      requires_manual_review: state.requiresManualReview ?? false,
      // branch: state.branch || null, // TODO: Add branch column to Supabase schema
    };

    // Insert the lead
    const { data: lead, error: leadError } = await supabase
      .from('funnel_leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) {
      console.error('Error saving funnel lead:', leadError);
      return {
        success: false,
        leadId: '',
        error: leadError.message || 'Failed to save funnel lead',
      };
    }

    if (!lead) {
      return {
        success: false,
        leadId: '',
        error: 'No lead returned after insert',
      };
    }

    // If add-ons were selected, insert them
    if (selectedAddOns.length > 0) {
      const addonRecords = selectedAddOns.map((addon) => ({
        funnel_lead_id: lead.id,
        addon_id: addon.id,
        addon_name: addon.name,
        price: addon.price,
      }));

      const { error: addonError } = await supabase
        .from('funnel_add_ons')
        .insert(addonRecords);

      if (addonError) {
        console.error('Error saving add-ons:', addonError);
        // Still return success for the lead, but log the add-on error
      }
    }

    // Fire lead notification email — failure never blocks the response
    try {
      const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
      await sendEmail({
        to: NOTIFY_EMAIL,
        subject: `${state.requiresManualReview ? '⚠ MANUAL REVIEW — ' : ''}New funnel lead: ${state.contact.name}`,
        html: funnelLeadNotificationHtml({
          name: state.contact.name,
          email: state.contact.email,
          businessName: state.contact.businessName,
          recommendedPlan: state.recommendedPlan || 'TBD',
          projectType: state.projectType || state.q1_projectType || 'unknown',
          budget: state.fq1_budget || undefined,
          requiresManualReview: state.requiresManualReview ?? false,
          manualReviewFlags: state.manualReviewFlags || [],
          estimatedTotal: (state.recommendedPrice || 0) + (state.estimatedAddOnPrice || 0),
          submittedAt,
        }),
      });
    } catch (emailErr) {
      console.error('[saveFunnelWithAddOnsAction] Email send failed:', emailErr);
    }

    return {
      success: true,
      leadId: lead.id,
    };
  } catch (err) {
    console.error('Unexpected error saving funnel:', err);
    return {
      success: false,
      leadId: '',
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    };
  }
}

// ─── Contact message action ───────────────────────────────────────────────────

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  message?: string;
  source?: string;
}

export interface ContactMessageResult {
  success: boolean;
  error?: string;
}

export async function saveContactMessageAction(
  input: ContactMessageInput
): Promise<ContactMessageResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('contact_messages').insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      business_name: input.businessName || null,
      message: input.message || null,
      source: input.source || 'contact_form',
    });

    if (error) {
      console.error('Error saving contact message:', JSON.stringify({
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }));
      return { success: false, error: error.message || 'Database error' };
    }

    // Fire emails in parallel — failure never blocks the response
    try {
      const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
      await Promise.all([
        sendEmail({
          to: input.email,
          subject: 'We got your message — 48H Live',
          html: contactAutoReplyHtml({
            userName: input.name.split(' ')[0],
            siteUrl: SITE_URL,
          }),
        }),
        sendEmail({
          to: NOTIFY_EMAIL,
          subject: `New contact: ${input.name}`,
          html: contactNotificationHtml({
            name: input.name,
            email: input.email,
            businessName: input.businessName,
            message: input.message,
            submittedAt,
          }),
        }),
      ]);
    } catch (emailErr) {
      console.error('[saveContactMessageAction] Email send failed:', emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error saving contact message:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    };
  }
}
