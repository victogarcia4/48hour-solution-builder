import React from 'react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-brutal-yellow py-20 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-block bg-black text-white px-6 py-2 font-black text-sm uppercase mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
          Disrupting the Agency Model
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
          Let's Build Your <span className="bg-white px-4 border-4 border-black inline-block -rotate-2 text-black">Solution</span> In Less Than 48 Hours
        </h1>
        <p className="text-xl md:text-3xl font-bold mb-12 max-w-3xl mx-auto leading-tight">
          Answer a guided funnel, choose your style and features, and get a professional website, online store, or custom web app built at a fraction of agency pricing.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="#funnel" className="brutal-btn bg-black text-white text-xl px-10 py-5">
            Build My 48-Hour Solution
          </a>
          <a href="#pricing" className="brutal-btn bg-white text-black text-xl px-10 py-5">
            See Pricing
          </a>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-8 font-black uppercase text-xs tracking-widest opacity-80">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            No long meetings
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            No complicated forms
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            No waiting weeks
          </span>
        </div>
      </div>
    </section>
  );
};
