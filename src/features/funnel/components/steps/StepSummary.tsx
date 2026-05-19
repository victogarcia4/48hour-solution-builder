'use client';

import { useState } from 'react';
import type { FunnelState, SelectedAddon } from '../../types';
import { getSuggestedAddOns, calculateTotalPrice } from '../../utils/plan-recommendation';
import { ADDON_CATALOG } from '../../constants/questions';
import { PLAN_DETAILS } from '../../constants/plans';

interface StepSummaryProps {
  state: FunnelState;
  onPrevious: () => void;
  onSubmit: (addOns: SelectedAddon[]) => void;
  isSubmitting: boolean;
}

export function StepSummary({ state, onPrevious, onSubmit, isSubmitting }: StepSummaryProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddon[]>(state.selectedAddOns || []);

  const suggestedAddOns = getSuggestedAddOns(state);
  const priceBreakdown = calculateTotalPrice(state, selectedAddOns);

  const planName = getPlanName(state.recommendedPlan);
  const planDetails = PLAN_DETAILS[planName as keyof typeof PLAN_DETAILS];

  const toggleAddOn = (addon: SelectedAddon) => {
    if (selectedAddOns.find((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Your perfect plan</h2>
        <p className="text-lg text-gray-600">Based on your answers, here's what we recommend.</p>
      </div>

      {/* Recommended Plan */}
      <div className="border-2 border-black rounded-lg p-8 bg-black text-white">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase mb-2">Recommended</p>
          <h3 className="text-2xl font-black mb-2">{planName}</h3>
          <p className="text-4xl font-black">{planDetails?.price || '$TBD'}</p>
        </div>

        {planDetails?.includes && (
          <div>
            <p className="text-sm font-bold uppercase mb-3">Includes:</p>
            <ul className="space-y-2">
              {planDetails.includes.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-lg leading-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Suggested Add-ons */}
      {suggestedAddOns.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">We also suggest...</h3>
          <div className="space-y-3">
            {suggestedAddOns.map((addon) => {
              const isSelected = selectedAddOns.find((a) => a.id === addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{addon.name}</p>
                      <p className="text-sm">{addon.reason}</p>
                    </div>
                    <p className="font-bold whitespace-nowrap ml-4">+${addon.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Add-ons */}
      <div>
        <h3 className="text-xl font-bold mb-4">Other add-ons</h3>
        <div className="space-y-3">
          {ADDON_CATALOG.map((addon) => {
            // Skip if already suggested
            if (suggestedAddOns.find((a) => a.id === addon.id)) {
              return null;
            }
            const isSelected = selectedAddOns.find((a) => a.id === addon.id);
            return (
              <button
                key={addon.id}
                onClick={() =>
                  toggleAddOn({
                    id: addon.id,
                    name: addon.name,
                    price: addon.price,
                  })
                }
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{addon.name}</p>
                    <p className="text-sm">{addon.description}</p>
                  </div>
                  <p className="font-bold whitespace-nowrap ml-4">+${addon.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3 border-2 border-gray-300">
        <div className="flex justify-between text-lg">
          <span>Base Plan:</span>
          <span className="font-bold">${priceBreakdown.basePlan}</span>
        </div>
        {priceBreakdown.addOns > 0 && (
          <div className="flex justify-between text-lg">
            <span>Add-ons:</span>
            <span className="font-bold">+${priceBreakdown.addOns}</span>
          </div>
        )}
        <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-2xl">
          <span className="font-black">Total:</span>
          <span className="font-black">${priceBreakdown.total}</span>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={() => onSubmit(selectedAddOns)}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Confirm & Let\'s Build'}
        </button>
      </div>
    </div>
  );
}

function getPlanName(planType: string | undefined): string {
  switch (planType) {
    case 'plan1':
      return 'Starter Landing';
    case 'plan2':
      return 'Online Store Launch';
    case 'plan3':
      return 'Business Platform Lite';
    case 'plan4':
      return 'Web or Mobile Mini App';
    default:
      return 'Custom Plan';
  }
}
