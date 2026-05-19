'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Pricing = () => {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="bg-brutal-cyan py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            {t('title')} <span className="bg-white text-black px-2 italic">{t('titleHighlight')}</span>
          </h2>
          <p className="text-2xl md:text-3xl font-black mb-12 uppercase tracking-tight">
            {t('description')} <br />
            {t('descriptionEnd')}
          </p>

          <div className="mb-12">
            <a href="#funnel" className="brutal-btn bg-brutal-yellow text-black text-3xl px-16 py-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-all">
              {t('cta')}
            </a>
          </div>

          <p className="text-sm font-black uppercase opacity-60 tracking-[0.2em]">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};
