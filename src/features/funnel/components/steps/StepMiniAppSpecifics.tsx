'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import {
  MINI_APP_TYPES,
  MINI_APP_USERS,
  MINI_APP_FEATURES,
  MINI_APP_INTEGRATIONS,
  WEB_APP_URGENCY_OPTIONS,
} from '../../constants/questions';

interface StepMiniAppSpecificsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepMiniAppSpecifics({ state, onNext, onPrevious }: StepMiniAppSpecificsProps) {
  const [appType, setAppType] = useState<string | null>(state.ma11_appType || null);
  const [users, setUsers] = useState<string[]>(state.ma12_users || []);
  const [features, setFeatures] = useState<string[]>(state.ma13_features || []);
  const [requiresLogin, setRequiresLogin] = useState<boolean | null>(state.ma14_requiresLogin ?? null);
  const [integrations, setIntegrations] = useState<string[]>(state.ma15_integrations || []);
  const [urgency, setUrgency] = useState<string | null>(state.ma16_urgency || null);
  const [error, setError] = useState('');

  const toggleMultiSelect = (value: string, current: string[]): string[] => {
    if (current.includes(value)) return current.filter((v) => v !== value);
    return [...current, value];
  };

  const handleNext = () => {
    if (!appType || users.length === 0 || features.length === 0 || requiresLogin === null || integrations.length === 0 || !urgency) {
      setError('Please complete all questions');
      return;
    }
    onNext({
      ma11_appType: appType,
      ma12_users: users,
      ma13_features: features,
      ma14_requiresLogin: requiresLogin,
      ma15_integrations: integrations,
      ma16_urgency: urgency,
    });
  };

  return (
    <div className="space-y-8 max-h-[800px] overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black mb-2">Mini app specifics</h2>
        <p className="text-lg text-gray-600">Tell us about your app idea.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">What type of app? (Q11)</h3>
          <div className="space-y-2">
            {MINI_APP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => { setAppType(type); setError(''); }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  appType === type ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Who will use it? (Q12)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {MINI_APP_USERS.map((user) => (
              <button
                key={user}
                onClick={() => { setUsers(toggleMultiSelect(user, users)); setError(''); }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  users.includes(user) ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {user}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Core features needed? (Q13)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {MINI_APP_FEATURES.map((feature) => (
              <button
                key={feature}
                onClick={() => { setFeatures(toggleMultiSelect(feature, features)); setError(''); }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  features.includes(feature) ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Requires login? (Q14)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => { setRequiresLogin(true); setError(''); }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                requiresLogin === true ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => { setRequiresLogin(false); setError(''); }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                requiresLogin === false ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Integrations needed? (Q15)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {MINI_APP_INTEGRATIONS.map((integration) => (
              <button
                key={integration}
                onClick={() => { setIntegrations(toggleMultiSelect(integration, integrations)); setError(''); }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  integrations.includes(integration) ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {integration}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Urgency? (Q16)</h3>
          <div className="space-y-2">
            {WEB_APP_URGENCY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => { setUrgency(option.id); setError(''); }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  urgency === option.id ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      <div className="flex gap-4 pt-6 sticky bottom-0 bg-white">
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
