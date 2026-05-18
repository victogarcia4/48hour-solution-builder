'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';

interface StepDomainTimelineProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepDomainTimeline({ state, onNext, onPrevious }: StepDomainTimelineProps) {
  const [hasDomain, setHasDomain] = useState<boolean | null>(state.q9_hasDomain ?? null);
  const [timeline, setTimeline] = useState<string | null>(state.q10_launchTimeline || null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (hasDomain === null || !timeline) {
      setError('Please answer both questions');
      return;
    }
    onNext({
      q9_hasDomain: hasDomain,
      q10_launchTimeline: timeline,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Domain & launch timeline</h2>
        <p className="text-lg text-gray-600">Final details to help us plan.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">Do you have a domain name?</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasDomain(true);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasDomain === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes, I have one
            </button>
            <button
              onClick={() => {
                setHasDomain(false);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasDomain === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Need to buy
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">When do you want to launch?</h3>
          <div className="space-y-2">
            {['This week', 'Next week', 'This month', 'Flexible'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setTimeline(option);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  timeline === option
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      <div className="flex gap-4 pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}
