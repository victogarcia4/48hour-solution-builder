'use client';

import { useState } from 'react';
import type { FunnelState } from '../../types';
import {
  ECOMMERCE_WHAT_TO_SELL,
  ECOMMERCE_PRODUCT_COUNT_OPTIONS,
  PAYMENT_METHODS,
  ECOMMERCE_LANGUAGES,
} from '../../constants/questions';

interface StepEcommerceSpecificsProps {
  state: FunnelState;
  onNext: (data: Partial<FunnelState>) => void;
  onPrevious: () => void;
}

export function StepEcommerceSpecifics({
  state,
  onNext,
  onPrevious,
}: StepEcommerceSpecificsProps) {
  const [whatToSell, setWhatToSell] = useState<string | null>(state.ec11_whatToSell || null);
  const [productCount, setProductCount] = useState<string | null>(state.ec12_productCount || null);
  const [pricesDefined, setPricesDefined] = useState<boolean | null>(state.ec13_pricesDefined ?? null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(state.ec14_paymentMethod || null);
  const [shipping, setShipping] = useState<boolean | null>(state.ec15_shipping ?? null);
  const [inventory, setInventory] = useState<boolean | null>(state.ec16_inventory ?? null);
  const [automatedEmails, setAutomatedEmails] = useState<string[]>(state.ec17_automatedEmails || []);
  const [language, setLanguage] = useState<string | null>(state.ec18_language || null);
  const [error, setError] = useState('');

  const toggleEmail = (email: string) => {
    if (automatedEmails.includes(email)) {
      setAutomatedEmails(automatedEmails.filter((e) => e !== email));
    } else {
      setAutomatedEmails([...automatedEmails, email]);
    }
    setError('');
  };

  const handleNext = () => {
    if (
      !whatToSell ||
      !productCount ||
      pricesDefined === null ||
      !paymentMethod ||
      shipping === null ||
      inventory === null ||
      !language
    ) {
      setError('Please complete all questions');
      return;
    }
    onNext({
      ec11_whatToSell: whatToSell,
      ec12_productCount: productCount,
      ec13_pricesDefined: pricesDefined,
      ec14_paymentMethod: paymentMethod,
      ec15_shipping: shipping,
      ec16_inventory: inventory,
      ec17_automatedEmails: automatedEmails,
      ec18_language: language,
    });
  };

  return (
    <div className="space-y-8 max-h-[800px] overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black mb-2">Ecommerce specifics</h2>
        <p className="text-lg text-gray-600">Tell us about your store.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3">What will you sell? (Q11)</h3>
          <div className="space-y-2">
            {ECOMMERCE_WHAT_TO_SELL.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setWhatToSell(option);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  whatToSell === option
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
          <h3 className="text-lg font-bold mb-3">How many products initially? (Q12)</h3>
          <div className="space-y-2">
            {ECOMMERCE_PRODUCT_COUNT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setProductCount(option.id);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  productCount === option.id
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
          <h3 className="text-lg font-bold mb-3">Are your prices defined? (Q13)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPricesDefined(true);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                pricesDefined === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setPricesDefined(false);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                pricesDefined === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Payment method? (Q14)</h3>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method}
                onClick={() => {
                  setPaymentMethod(method);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  paymentMethod === method
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Do you need shipping setup? (Q15)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShipping(true);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                shipping === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setShipping(false);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                shipping === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Inventory tracking? (Q16)</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setInventory(true);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                inventory === true
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setInventory(false);
                setError('');
              }}
              className={`flex-1 p-3 border-2 rounded-lg font-semibold transition-all ${
                inventory === false
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Automated emails? (Q17)</h3>
          <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
          <div className="space-y-2">
            {['Order confirmation', 'Shipping notification', 'Abandoned cart reminder'].map((email) => (
              <button
                key={email}
                onClick={() => toggleEmail(email)}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  automatedEmails.includes(email)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white text-black'
                }`}
              >
                {email}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Site language? (Q18)</h3>
          <div className="space-y-2">
            {ECOMMERCE_LANGUAGES.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setLanguage(option.id);
                  setError('');
                }}
                className={`w-full p-3 border-2 rounded-lg text-left font-semibold transition-all ${
                  language === option.id
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
