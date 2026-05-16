'use client';

import React from 'react';

export const Contact = () => {
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

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Your Name</label>
              <input 
                type="text" 
                placeholder="e.g. Alex Rivera"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-yellow transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Work Email</label>
              <input 
                type="email" 
                placeholder="alex@business.com"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-cyan transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Business Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rivera Design Studio"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-pink transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-black uppercase text-sm tracking-widest">Your Message</label>
              <textarea 
                rows={4}
                placeholder="How can we help you solve your problem?"
                className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none focus:bg-brutal-green transition-colors resize-none"
              ></textarea>
            </div>

            <button className="brutal-btn bg-black text-white w-full py-6 text-2xl mt-4">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
