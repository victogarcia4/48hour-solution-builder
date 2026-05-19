'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';

interface StepContactInfoProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepContactInfo({ state, onNext, onPrevious }: StepContactInfoProps) {
  const [name, setName] = useState(state.contact.name || '');
  const [email, setEmail] = useState(state.contact.email || '');
  const [businessName, setBusinessName] = useState(state.contact.businessName || '');
  const [phone, setPhone] = useState(state.contact.phone || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      contact: {
        name: name.trim(),
        email: email.trim(),
        businessName: businessName.trim(),
        phone: phone.trim() || undefined,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2">Your contact information</h2>
        <p className="text-lg text-gray-600">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Your name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: '' });
            }}
            placeholder="John Doe"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
            }`}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Email address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            placeholder="john@example.com"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
            }`}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Business name *</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              setErrors({ ...errors, businessName: '' });
            }}
            placeholder="Acme Corp"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
              errors.businessName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
            }`}
          />
          {errors.businessName && <p className="text-red-600 text-sm mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Phone (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
        </div>
      </div>

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
