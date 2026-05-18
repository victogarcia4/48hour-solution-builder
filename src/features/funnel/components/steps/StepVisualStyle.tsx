'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import { VISUAL_STYLES } from '../../constants/questions';

interface StepVisualStyleProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepVisualStyle({ state, onNext, onPrevious }: StepVisualStyleProps) {
  const [selected, setSelected] = useState<string | null>(state.q4_visualStyle || null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) {
      setError('Please select a visual style');
      return;
    }
    onNext({ q4_visualStyle: selected });
  };

  const selectedStyle = VISUAL_STYLES.find((style) => style.id === selected);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">What's your visual style?</h2>
        <p className="text-lg text-gray-600">Choose the aesthetic that fits your brand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VISUAL_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => {
              setSelected(style.id);
              setError('');
            }}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selected === style.id
                ? 'border-black bg-gray-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="mb-4">
              <h3 className="font-black text-lg">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
            <div className="flex gap-2 mb-3">
              {style.colors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-700">{style.fonts}</p>
          </button>
        ))}
      </div>

      {selectedStyle && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-semibold">
            You selected: <span className="font-black">{selectedStyle.name}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">{selectedStyle.description}</p>
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
