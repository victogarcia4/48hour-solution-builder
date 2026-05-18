'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';

interface StepContentAssetsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepContentAssets({ state, onNext, onPrevious }: StepContentAssetsProps) {
  const [hasImages, setHasImages] = useState<boolean | null>(state.q7_hasImages ?? null);
  const [hasCopy, setHasCopy] = useState<boolean | null>(state.q8_hasCopy ?? null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (hasImages === null || hasCopy === null) {
      setError('Please answer both questions');
      return;
    }
    onNext({
      q7_hasImages: hasImages,
      q8_hasCopy: hasCopy,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Content assets</h2>
        <p className="text-lg text-gray-600">Do you have images and copy ready?</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">Do you have images for your site?</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasImages(true);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasImages === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes, I have images
            </button>
            <button
              onClick={() => {
                setHasImages(false);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasImages === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Need images
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Do you have copy/content written?</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasCopy(true);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasCopy === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes, I have copy
            </button>
            <button
              onClick={() => {
                setHasCopy(false);
                setError('');
              }}
              className={`flex-1 p-4 border-2 rounded-lg font-semibold transition-all ${
                hasCopy === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Need copywriting
            </button>
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
