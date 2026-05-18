'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';

interface StepBrandAssetsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepBrandAssets({ state, onNext, onPrevious }: StepBrandAssetsProps) {
  const [hasLogo, setHasLogo] = useState<boolean | null>(state.q5_hasLogo ?? null);
  const [brandColors, setBrandColors] = useState<string>(
    state.q6_brandColors?.join(', ') || ''
  );
  const [error, setError] = useState('');

  const handleNext = () => {
    if (hasLogo === null) {
      setError('Please indicate if you have a logo');
      return;
    }
    onNext({
      q5_hasLogo: hasLogo,
      q6_brandColors: brandColors
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Brand assets</h2>
        <p className="text-lg text-gray-600">Do you have a logo and brand colors?</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">Do you have a logo?</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasLogo(true);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasLogo === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes, I have a logo
            </button>
            <button
              onClick={() => {
                setHasLogo(false);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasLogo === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No logo yet
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Brand colors (optional)</h3>
          <input
            type="text"
            value={brandColors}
            onChange={(e) => {
              setBrandColors(e.target.value);
              setError('');
            }}
            placeholder="e.g., #FF0000, #0000FF, #00FF00"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter hex codes separated by commas, or just name your colors
          </p>
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
