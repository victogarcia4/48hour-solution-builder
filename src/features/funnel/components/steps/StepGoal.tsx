'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import { GOALS } from '../../constants/questions';

interface StepGoalProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepGoal({ state, onNext, onPrevious }: StepGoalProps) {
  const [selected, setSelected] = useState<string | null>(state.q2_goal || null);
  const [customGoal, setCustomGoal] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    const finalGoal = selected === 'Other' ? customGoal : selected;
    if (!finalGoal) {
      setError('Please select or enter your main goal');
      return;
    }
    onNext({ q2_goal: finalGoal });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">What's your main goal?</h2>
        <p className="text-lg text-gray-600">What do you want to achieve with this project?</p>
      </div>

      <div className="space-y-3">
        {GOALS.map((goal) => (
          <button
            key={goal}
            onClick={() => {
              setSelected(goal);
              if (goal !== 'Other') setCustomGoal('');
              setError('');
            }}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selected === goal
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400 bg-white text-black'
            }`}
          >
            {goal}
          </button>
        ))}
      </div>

      {selected === 'Other' && (
        <div>
          <label className="block text-sm font-semibold mb-2">Please describe your goal:</label>
          <input
            type="text"
            value={customGoal}
            onChange={(e) => {
              setCustomGoal(e.target.value);
              setError('');
            }}
            placeholder="Type your custom goal..."
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
