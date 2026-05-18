'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import {
  LANDING_SECTIONS,
  LANDING_CTAs,
  LANDING_FORM_TYPES,
} from '../../constants/questions';

interface StepLandingSpecificsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepLandingSpecifics({
  state,
  onNext,
  onPrevious,
}: StepLandingSpecificsProps) {
  const [sections, setSections] = useState<string[]>(state.lp11_sections || []);
  const [cta, setCta] = useState<string | null>(state.lp12_cta || null);
  const [formType, setFormType] = useState<string | null>(state.lp13_formType || null);
  const [references, setReferences] = useState(state.lp14_references || '');
  const [error, setError] = useState('');

  const toggleSection = (section: string) => {
    if (sections.includes(section)) {
      setSections(sections.filter((s) => s !== section));
    } else {
      setSections([...sections, section]);
    }
    setError('');
  };

  const handleNext = () => {
    if (sections.length === 0 || !cta || !formType) {
      setError('Please complete all questions');
      return;
    }
    onNext({
      lp11_sections: sections,
      lp12_cta: cta,
      lp13_formType: formType,
      lp14_references: references,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Landing page specifics</h2>
        <p className="text-lg text-gray-600">Tell us about your landing page details.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">What sections do you need? (Q11)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {LANDING_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => toggleSection(section)}
                className={`p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  sections.includes(section)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">What should visitors do? (Q12)</h3>
          <div className="space-y-2">
            {LANDING_CTAs.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setCta(option);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  cta === option
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">What form type? (Q13)</h3>
          <div className="space-y-2">
            {LANDING_FORM_TYPES.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setFormType(option.id);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  formType === option.id
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
          <h3 className="text-lg font-bold mb-3">Reference sites (Q14)</h3>
          <textarea
            value={references}
            onChange={(e) => {
              setReferences(e.target.value);
              setError('');
            }}
            placeholder="Share URLs of sites you like or want to reference..."
            rows={3}
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
