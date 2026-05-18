'use client';

import type { FunnelState } from '../../types';

interface StepManualReviewSchedulingProps {
  state: FunnelState;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepManualReviewScheduling({
  state,
  onPrevious,
  onSubmit,
  isSubmitting,
}: StepManualReviewSchedulingProps) {
  const flagLabels: Record<string, string> = {
    ECOMMERCE_PRODUCT_COUNT_EXCEEDS_10: 'Your store has more than 10 products',
    WEBAPP_MULTIPLE_USER_ROLES: 'Multiple user roles with login required',
    WEBAPP_ADVANCED_AUTOMATIONS: 'Advanced automation workflows',
    BUDGET_BELOW_RECOMMENDED_PLAN: 'Budget is below the recommended plan',
    PROJECT_TYPE_AND_GOAL_UNDEFINED: 'Project type and goal need clarification',
  };

  const getFlags = (): { code: string; label: string }[] => {
    return (state.manualReviewFlags || []).map((flag) => ({
      code: flag,
      label: flagLabels[flag] || flag,
    }));
  };

  const flags = getFlags();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Your project needs custom scoping</h2>
        <p className="text-lg text-gray-600">
          We want to make sure we build exactly what you need. Let's chat!
        </p>
      </div>

      {/* Flags Display */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 space-y-3">
        <p className="font-bold text-amber-900">Why we want to chat:</p>
        <ul className="space-y-2">
          {flags.map((flag) => (
            <li key={flag.code} className="flex items-start gap-2 text-amber-900">
              <span className="text-lg leading-none">⚡</span>
              <span>{flag.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Info Section */}
      <div className="space-y-4">
        <p className="text-lg font-semibold">Here's what happens next:</p>
        <ol className="space-y-3">
          <li className="flex gap-4">
            <span className="font-black text-2xl text-black w-10">1</span>
            <div>
              <p className="font-bold">Schedule a quick call</p>
              <p className="text-gray-600">Pick a time that works for you</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-black text-2xl text-black w-10">2</span>
            <div>
              <p className="font-bold">We discuss your project</p>
              <p className="text-gray-600">30 minutes to align on scope & timeline</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-black text-2xl text-black w-10">3</span>
            <div>
              <p className="font-bold">Custom quote & start building</p>
              <p className="text-gray-600">We'll send you a tailored proposal</p>
            </div>
          </li>
        </ol>
      </div>

      {/* Contact Info Display */}
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
        <p className="text-sm font-bold uppercase mb-4 text-gray-600">Your contact info</p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {state.contact.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {state.contact.email}
          </p>
          <p>
            <span className="font-semibold">Business:</span> {state.contact.businessName}
          </p>
          {state.contact.phone && (
            <p>
              <span className="font-semibold">Phone:</span> {state.contact.phone}
            </p>
          )}
        </div>
      </div>

      {/* Calendly Embed or Note */}
      <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
        <p className="text-center text-gray-600 mb-4">
          We'll send you a calendar link via email to schedule your call.
        </p>
        <p className="text-center text-sm text-gray-500">
          Typical response time: within 24 hours
        </p>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Schedule a Call'}
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        We respect your time and won't share your info with anyone
      </p>
    </div>
  );
}
