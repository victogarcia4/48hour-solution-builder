import React from 'react';

export const Pricing = () => {
  const plans = [
    {
      name: 'Starter Landing',
      price: '$650',
      bestFor: 'Professionals & Small Biz',
      features: [
        'Finished landing page',
        'Up to 6 sections',
        'Mobile responsive',
        'Contact form',
        'AI-assisted copy',
        '2 Revisions included'
      ],
      color: 'bg-white',
      btnColor: 'bg-black text-white'
    },
    {
      name: 'Online Store',
      price: '$1,850',
      bestFor: 'Selling products online',
      features: [
        'Basic multipage site',
        'Up to 10 initial products',
        'Payment integration',
        'Cart & Checkout',
        'Basic SEO',
        '2 Revisions included'
      ],
      color: 'bg-brutal-yellow',
      btnColor: 'bg-black text-white',
      featured: true
    },
    {
      name: 'Platform Lite',
      price: '$3,950+',
      bestFor: 'Custom business tools',
      features: [
        'Multipage website',
        'Custom web app / Dashboard',
        'Lead capture system',
        'Advanced automations',
        'Database integration',
        'Phased delivery support'
      ],
      color: 'bg-white',
      btnColor: 'bg-black text-white'
    }
  ];

  return (
    <section id="pricing" className="bg-brutal-cyan py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Disruptive <span className="bg-white text-black px-2 italic">Pricing</span>
          </h2>
          <p className="text-2xl md:text-3xl font-black mb-12 uppercase tracking-tight">
            Approximately 1/2 the cost of traditional agencies. <br />
            Fast, transparent, and built to scale.
          </p>
          
          <div className="mb-12">
            <a href="#funnel" className="brutal-btn bg-brutal-yellow text-black text-3xl px-16 py-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-all">
              SEE MY PRICE NOW
            </a>
          </div>

          <p className="text-sm font-black uppercase opacity-60 tracking-[0.2em]">
            No hidden fees. No surprises. Just results.
          </p>
        </div>
      </div>
    </section>
  );
};
