'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import { STYLE_TONES } from '../../constants/questions';

interface StepStyleAdjustmentsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepStyleAdjustments({ state, onNext, onPrevious }: StepStyleAdjustmentsProps) {
  const [tone, setTone] = useState<string | null>(state.q4b_styleTone || null);
  const [colorPref, setColorPref] = useState<string | null>(state.q4c_colorPreference || null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!tone || !colorPref) {
      setError('Please answer both questions');
      return;
    }
    onNext({
      q4b_styleTone: tone,
      q4c_colorPreference: colorPref,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Let's fine-tune your style</h2>
        <p className="text-lg text-gray-600">Add some adjustments to match your vibe.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">Style tone?</h3>
          <div className="space-y-2">
            {STYLE_TONES.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setTone(option.id);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  tone === option.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Color preference?</h3>
          <input
            type="text"
            value={colorPref || ''}
            onChange={(e) => {
              setColorPref(e.target.value);
              setError('');
            }}
            placeholder="e.g., blues, warm tones, earth tones..."
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
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
