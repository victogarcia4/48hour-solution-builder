import React from 'react';
import { Check } from 'lucide-react';

export const Promise = () => {
  const inclusions = [
    'Final visual design applied',
    'Working navigation',
    'Responsive layout',
    'Functional contact form',
    'Connected CTA buttons',
    'Mobile optimization',
    'Structured copy',
    'Basic SEO'
  ];

  return (
    <section className="bg-brutal-pink py-24 px-6 border-b-4 border-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white border-b-4 border-l-4 border-black -translate-y-12 translate-x-12 rotate-12 opacity-50"></div>
      
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
            Finished, Functional, and Ready to Launch
          </h2>
          <p className="text-2xl font-bold max-w-3xl mx-auto mb-8 bg-white border-4 border-black p-4 rotate-1">
            "We do not deliver an incomplete MVP, a static mockup, or a half-built page."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase">Finished Means Finished</h3>
            <p className="text-xl font-bold leading-tight">
              After you approve the plan and submit assets, the build begins. The result is a finished product ready to represent your business, capture leads, or sell services.
            </p>
            <div className="bg-black text-white p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <p className="font-bold italic">
                "Delivery in less than 48 hours applies to projects within the approved scope. We prioritize speed without sacrificing quality."
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 inline-block">What's Included:</h4>
            <div className="grid grid-cols-1 gap-4">
              {inclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-3 font-bold">
                  <div className="bg-brutal-green p-1 border-2 border-black">
                    <Check size={18} strokeWidth={4} />
                  </div>
                  <span className="uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t-2 border-black border-dashed font-black uppercase text-center text-sm">
              + Up to 2 revisions included
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
