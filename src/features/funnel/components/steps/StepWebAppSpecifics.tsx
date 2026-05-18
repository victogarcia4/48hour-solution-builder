'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import {
  WEB_APP_TYPES,
  WEB_APP_USERS,
  WEB_APP_DATA_STORAGE,
  WEB_APP_ACTIONS,
  WEB_APP_DATA_DESTINATIONS,
  WEB_APP_AUTOMATIONS,
  WEB_APP_URGENCY_OPTIONS,
} from '../../constants/questions';

interface StepWebAppSpecificsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepWebAppSpecifics({
  state,
  onNext,
  onPrevious,
}: StepWebAppSpecificsProps) {
  const [appType, setAppType] = useState<string | null>(state.wa11_appType || null);
  const [users, setUsers] = useState<string[]>(state.wa12_users || []);
  const [requiresLogin, setRequiresLogin] = useState<boolean | null>(state.wa13_requiresLogin ?? null);
  const [dataToStore, setDataToStore] = useState<string[]>(state.wa14_dataToStore || []);
  const [needsDashboard, setNeedsDashboard] = useState<boolean | null>(state.wa15_needsDashboard ?? null);
  const [appActions, setAppActions] = useState<string[]>(state.wa16_appActions || []);
  const [dataDestination, setDataDestination] = useState<string[]>(state.wa17_dataDestination || []);
  const [automations, setAutomations] = useState<string[]>(state.wa18_automations || []);
  const [urgency, setUrgency] = useState<string | null>(state.wa19_urgency || null);
  const [error, setError] = useState('');

  const toggleMultiSelect = (value: string, current: string[]): string[] => {
    if (current.includes(value)) {
      return current.filter((v) => v !== value);
    }
    return [...current, value];
  };

  const handleNext = () => {
    if (
      !appType ||
      users.length === 0 ||
      requiresLogin === null ||
      dataToStore.length === 0 ||
      needsDashboard === null ||
      appActions.length === 0 ||
      dataDestination.length === 0 ||
      automations.length === 0 ||
      !urgency
    ) {
      setError('Please complete all questions');
      return;
    }
    onNext({
      wa11_appType: appType,
      wa12_users: users,
      wa13_requiresLogin: requiresLogin,
      wa14_dataToStore: dataToStore,
      wa15_needsDashboard: needsDashboard,
      wa16_appActions: appActions,
      wa17_dataDestination: dataDestination,
      wa18_automations: automations,
      wa19_urgency: urgency,
    });
  };

  return (
    <div className="space-y-8 max-h-[800px] overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black mb-2">Web app specifics</h2>
        <p className="text-lg text-gray-600">Let's define your custom app.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">What type of app? (Q11)</h3>
          <div className="space-y-2">
            {WEB_APP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setAppType(type);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  appType === type
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
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
            {WEB_APP_USERS.map((user) => (
              <button
                key={user}
                onClick={() => {
                  setUsers(toggleMultiSelect(user, users));
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  users.includes(user)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {user}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Requires login? (Q13)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setRequiresLogin(true);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                requiresLogin === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setRequiresLogin(false);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                requiresLogin === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Data to store? (Q14)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {WEB_APP_DATA_STORAGE.map((data) => (
              <button
                key={data}
                onClick={() => {
                  setDataToStore(toggleMultiSelect(data, dataToStore));
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  dataToStore.includes(data)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {data}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Needs dashboard? (Q15)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setNeedsDashboard(true);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                needsDashboard === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setNeedsDashboard(false);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                needsDashboard === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">App actions? (Q16)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {WEB_APP_ACTIONS.map((action) => (
              <button
                key={action}
                onClick={() => {
                  setAppActions(toggleMultiSelect(action, appActions));
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  appActions.includes(action)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Data destinations? (Q17)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {WEB_APP_DATA_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setDataDestination(toggleMultiSelect(dest, dataDestination));
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  dataDestination.includes(dest)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Automations? (Q18)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {WEB_APP_AUTOMATIONS.map((auto) => (
              <button
                key={auto}
                onClick={() => {
                  setAutomations(toggleMultiSelect(auto, automations));
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  automations.includes(auto)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {auto}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Urgency? (Q19)</h3>
          <div className="space-y-2">
            {WEB_APP_URGENCY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setUrgency(option.id);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  urgency === option.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
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
