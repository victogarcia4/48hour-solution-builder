'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Problem = () => {
  const t = useTranslations('problem');

  return (
    <section className="bg-white py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-8">
              {t('title')} <span className="text-brutal-pink">{t('titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-12 opacity-90">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.raw('painPoints').map((point: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-brutal-pink p-1 border-2 border-black">
                    <X size={20} strokeWidth={4} />
                  </div>
                  <span className="font-black uppercase text-sm tracking-tight">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-all"></div>
              <div className="relative bg-brutal-cyan border-4 border-black p-12 -rotate-1 group-hover:rotate-0 transition-all">
                <h3 className="text-3xl font-black uppercase mb-6">{t('agencyRealityTitle')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📉</div>
                    <div>
                      <p className="font-black uppercase text-lg">{t('slowTitle')}</p>
                      <p className="font-bold opacity-80 italic">{t('slowDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📉</div>
                    <div>
                      <p className="font-black uppercase text-lg">{t('overheadTitle')}</p>
                      <p className="font-bold opacity-80 italic">{t('overheadDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📉</div>
                    <div>
                      <p className="font-black uppercase text-lg">{t('jargonTitle')}</p>
                      <p className="font-bold opacity-80 italic">{t('jargonDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
