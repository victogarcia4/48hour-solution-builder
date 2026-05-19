'use client';

import React, { useState } from 'react';
import { saveContactMessageAction } from '@/lib/supabase/server-actions';

export const Contact = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await saveContactMessageAction({
        name: formData.name,
        email: formData.email,
        businessName: formData.businessName,
        message: formData.message,
        source: 'contact_form',
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="bg-brutal-pink py-24 px-6 border-b-4 border-black">
        <div className="mx-auto max-w-3xl">
          <div className="brutal-card bg-white p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center">
            <h2 className="text-4xl font-black uppercase mb-6 text-brutal-green">Message Received!</h2>
            <p className="text-xl font-bold uppercase">We'll get back to you in less than 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="mt-8 brutal-btn bg-black text-white px-8 py-3">Send Another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-brutal-pink py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-3xl">
        <div className="brutal-card bg-white p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4">
              ANY OTHER QUESTIONS?
            </h2>
            <p className="text-xl font-bold uppercase opacity-70">
              Drop us a message and we'll get back to you fast.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Your Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Rivera"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-yellow transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Work Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@business.com"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-cyan transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Business Name</label>
              <input 
                type="text" 
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Rivera Design Studio"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-pink transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Your Message</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you solve your problem?"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-green transition-colors resize-none"
              ></textarea>
            </div>

            {error && (
              <div className="border-4 border-red-500 bg-red-50 p-4 font-bold text-red-700 text-sm uppercase tracking-wide">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="brutal-btn bg-black text-white w-full py-6 text-2xl mt-4 disabled:opacity-50"
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
