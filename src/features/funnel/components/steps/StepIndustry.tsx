'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import { INDUSTRIES } from '../../constants/questions';

interface StepIndustryProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepIndustry({ state, onNext, onPrevious }: StepIndustryProps) {
  const [selected, setSelected] = useState<string | null>(state.q3_industry || null);
  const [customIndustry, setCustomIndustry] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    const finalIndustry = selected === 'Other' ? customIndustry : selected;
    if (!finalIndustry) {
      setError('Please select or enter your industry');
      return;
    }
    onNext({ q3_industry: finalIndustry });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">What industry are you in?</h2>
        <p className="text-lg text-gray-600">This helps us tailor recommendations.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {INDUSTRIES.map((industry) => (
          <button
            key={industry}
            onClick={() => {
              setSelected(industry);
              if (industry !== 'Other') setCustomIndustry('');
              setError('');
            }}
            className={`p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selected === industry
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400 bg-white text-black'
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      {selected === 'Other' && (
        <div>
          <label className="block text-sm font-semibold mb-2">Please describe your industry:</label>
          <input
            type="text"
            value={customIndustry}
            onChange={(e) => {
              setCustomIndustry(e.target.value);
              setError('');
            }}
            placeholder="Type your industry..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
        </div>
      )}

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
