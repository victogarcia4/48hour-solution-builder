'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import type { FunnelState, SelectedAddon } from '../types';
import {
  getVisibleSteps,
  getPlanRecommendation,
  detectManualReviewFlags,
} from '../utils/plan-recommendation';
import { saveFunnelWithAddOnsAction } from '@/lib/supabase/server-actions';

// Import all step components
import { StepProjectType } from './steps/StepProjectType';
import { StepGoal } from './steps/StepGoal';
import { StepIndustry } from './steps/StepIndustry';
import { StepVisualStyle } from './steps/StepVisualStyle';
import { StepStyleAdjustments } from './steps/StepStyleAdjustments';
import { StepBrandAssets } from './steps/StepBrandAssets';
import { StepContentAssets } from './steps/StepContentAssets';
import { StepDomainTimeline } from './steps/StepDomainTimeline';
import { StepLandingSpecifics } from './steps/StepLandingSpecifics';
import { StepEcommerceSpecifics } from './steps/StepEcommerceSpecifics';
import { StepWebAppSpecifics } from './steps/StepWebAppSpecifics';
import { StepContactInfo } from './steps/StepContactInfo';
import { StepSummary } from './steps/StepSummary';
import { StepManualReviewScheduling } from './steps/StepManualReviewScheduling';

const INITIAL_STATE: FunnelState = {
  currentStep: 0,
  totalSteps: 0,
  completedSteps: [],
  projectType: null,
  contact: {
    name: '',
    email: '',
    businessName: '',
  },
  startedAt: new Date(),
};

export default function FunnelContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<FunnelState>(INITIAL_STATE);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update visible steps whenever state changes (especially projectType)
  useEffect(() => {
    const steps = getVisibleSteps(state);
    setVisibleSteps(steps);
    setState((s) => ({
      ...s,
      totalSteps: steps.length,
    }));
  }, [state.projectType, state.requiresManualReview]);

  if (!isMounted) return <div className="h-[500px]" />;

  const getCurrentStep = (): string | null => {
    if (state.currentStep < visibleSteps.length) {
      return visibleSteps[state.currentStep];
    }
    return null;
  };

  const handleNext = (updateData: Partial<FunnelState>) => {
    const newState = { ...state, ...updateData };

    // Check for manual review flags after final questions
    if (getCurrentStep() === 'fq4_contactInfo') {
      const flags = detectManualReviewFlags(newState);
      newState.manualReviewFlags = flags;
      newState.requiresManualReview = flags.length > 0;
    }

    // Get recommendation after final questions
    if (getCurrentStep() === 'fq4_contactInfo') {
      const rec = getPlanRecommendation(newState);
      newState.recommendedPlan = rec.plan as any;
      newState.recommendedPrice = rec.price || 0;
    }

    setState(newState);

    // Move to next step
    setState((s) => ({
      ...s,
      currentStep: Math.min(s.currentStep + 1, visibleSteps.length - 1),
    }));
  };

  const handlePrevious = () => {
    setState((s) => ({
      ...s,
      currentStep: Math.max(s.currentStep - 1, 0),
    }));
  };

  const handleSubmit = async (selectedAddOns: SelectedAddon[] = []) => {
    setIsSubmitting(true);
    setError('');

    try {
      const result = await saveFunnelWithAddOnsAction(state, selectedAddOns);

      if (!result.success) {
        setError(result.error || 'Failed to save funnel');
        setIsSubmitting(false);
        return;
      }

      // Save to localStorage for reference
      localStorage.setItem(
        'latest_funnel_summary',
        JSON.stringify({
          ...state,
          selectedAddOns,
          submittedAt: new Date().toISOString(),
          leadId: result.leadId,
        })
      );

      // Move to final confirmation step
      setState((s) => ({
        ...s,
        currentStep: visibleSteps.length,
        completedAt: new Date(),
      }));
    } catch (err) {
      console.error('Error submitting funnel:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const currentStepId = getCurrentStep();

    // Welcome step (before first actual question)
    if (state.currentStep === 0 && visibleSteps.length > 0) {
      return (
        <div className="text-center py-12 space-y-8">
          <h2 className="text-5xl font-black uppercase mb-8 leading-none">
            LET'S BUILD YOUR <span className="bg-brutal-yellow px-2">SOLUTION</span> IN LESS
            THAN 48 HOURS.
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto">
            Answer a few quick questions. We'll guide you through defining your
            brand and goals.
          </p>
          <button
            onClick={() =>
              setState((s) => ({
                ...s,
                currentStep: 1,
              }))
            }
            className="brutal-btn bg-black text-white text-3xl px-16 py-8 hover:bg-brutal-pink transition-all"
          >
            START HERE
          </button>
        </div>
      );
    }

    // Final confirmation screen
    if (state.currentStep >= visibleSteps.length) {
      return (
        <div className="text-center py-12">
          <div className="inline-block bg-brutal-green border-4 border-black p-6 mb-8 rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Check size={64} className="text-black" strokeWidth={4} />
          </div>
          <h2 className="text-5xl font-black mb-4 uppercase leading-none">
            YOUR PROJECT IS READY!
          </h2>
          <p className="text-xl font-bold mb-12 uppercase opacity-70">
            We've received your information and will be in touch soon.
          </p>
          <a
            href="#contact"
            className="brutal-btn bg-black text-white text-3xl px-16 py-8 hover:bg-brutal-green transition-all inline-block"
          >
            RESERVE YOUR SLOT
          </a>
        </div>
      );
    }

    // Route to specific step component
    const stepProps = {
      state,
      onNext: handleNext,
      onPrevious: handlePrevious,
    };

    switch (currentStepId) {
      case 'q1_projectType':
        return <StepProjectType {...stepProps} />;
      case 'q2_goal':
        return <StepGoal {...stepProps} />;
      case 'q3_industry':
        return <StepIndustry {...stepProps} />;
      case 'q4_visualStyle':
        return <StepVisualStyle {...stepProps} />;
      case 'q4b_q4c_adjustments':
        return <StepStyleAdjustments {...stepProps} />;
      case 'q5_q6_brandAssets':
        return <StepBrandAssets {...stepProps} />;
      case 'q7_q8_contentAssets':
        return <StepContentAssets {...stepProps} />;
      case 'q9_q10_domainTimeline':
        return <StepDomainTimeline {...stepProps} />;
      case 'lp11_lp14_landingSpecifics':
        return <StepLandingSpecifics {...stepProps} />;
      case 'ec11_ec18_ecommerceSpecifics':
        return <StepEcommerceSpecifics {...stepProps} />;
      case 'wa11_wa19_webAppSpecifics':
        return <StepWebAppSpecifics {...stepProps} />;
      case 'fq1_budget':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-2">What's your budget?</h2>
              <p className="text-lg text-gray-600">Help us tailor recommendations.</p>
            </div>
            <div className="space-y-3">
              {['Under $1,000', '$1,000 - $2,000', '$2,000 - $5,000', '$5,000+', 'Flexible'].map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    handleNext({
                      fq1_budget: opt,
                    })
                  }
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-left font-semibold hover:border-black hover:bg-gray-50"
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-6">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
              >
                Back
              </button>
            </div>
          </div>
        );
      case 'fq3_preference':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-2">How would you like to proceed?</h2>
              <p className="text-lg text-gray-600">Choose what works best.</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'start_now', label: 'Start building now' },
                { value: 'quick_call', label: 'Schedule a quick call first' },
                { value: 'send_summary', label: 'Send me the summary' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    handleNext({
                      fq3_preference: opt.value as any,
                    })
                  }
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-left font-semibold hover:border-black hover:bg-gray-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-6">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
              >
                Back
              </button>
            </div>
          </div>
        );
      case 'fq4_contactInfo':
        return <StepContactInfo {...stepProps} />;
      case 'summary':
        return (
          <StepSummary
            state={state}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 'manualReviewScheduling':
        return (
          <StepManualReviewScheduling
            state={state}
            onPrevious={handlePrevious}
            onSubmit={() => handleSubmit([])}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const progress = visibleSteps.length > 0 ? ((state.currentStep + 1) / visibleSteps.length) * 100 : 0;

  return (
    <div className="relative">
      {/* Progress Bar */}
      {state.currentStep > 0 && state.currentStep < visibleSteps.length && (
        <div className="w-full bg-black h-6 mb-16 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-brutal-yellow h-full border-r-4 border-black"
          />
        </div>
      )}

      <div className="min-h-[500px] flex items-center justify-center px-4 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
            className="w-full max-w-2xl"
          >
            {renderCurrentStep()}
            {error && <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 font-semibold">{error}</div>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {state.currentStep > 0 && state.currentStep < visibleSteps.length && (
        <div className="flex justify-between mt-16 pt-8 border-t-4 border-black border-dashed">
          <button
            onClick={handlePrevious}
            className="brutal-btn bg-white text-black flex items-center gap-2 px-8 py-3 font-black uppercase"
          >
            <ChevronLeft size={24} strokeWidth={3} /> Back
          </button>

          <div className="hidden sm:flex items-center font-black uppercase text-xs opacity-50 tracking-widest">
            Step {state.currentStep} of {visibleSteps.length}
          </div>

          <div className="w-32"></div>
        </div>
      )}
    </div>
  );
}
