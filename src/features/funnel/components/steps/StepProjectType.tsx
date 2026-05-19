'use client';

import { useState } from 'react';
import type { FunnelState, ProjectType } from '../../types';
import { PROJECT_TYPES } from '../../constants/questions';

interface StepProjectTypeProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepProjectType({ state, onNext, onPrevious }: StepProjectTypeProps) {
  const [selected, setSelected] = useState<ProjectType | null>(
    (state.projectType as ProjectType) || null
  );
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) {
      setError('Please select a project type');
      return;
    }
    onNext({ projectType: selected });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">What do you need to build?</h2>
        <p className="text-lg text-gray-600">Let's start with your project scope.</p>
      </div>

      <div className="space-y-3">
        {PROJECT_TYPES.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelected(option.id as ProjectType);
              setError('');
            }}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selected === option.id
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400 bg-white text-black'
            }`}
          >
            {option.label}
          </button>
        ))}
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
