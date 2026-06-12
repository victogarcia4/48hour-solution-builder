'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Pricing = () => {
  const t = useTranslations('pricing');

  const planKeys = ['consultoria', 'starter', 'store', 'platform', 'ugc'] as const;

  return (
    <section id="pricing" className="bg-brutal-cyan py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            {t('title')} <span className="bg-white text-black px-4 -rotate-1 inline-block">{t('titleHighlight')}</span>
          </h2>
          <p className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight text-black">
            {t('description')} <br />
            {t('descriptionEnd')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-6 mb-16">
          {planKeys.map((key) => {
            const isConsultoria = key === 'consultoria';
            const isUgc = key === 'ugc';
            return (
              <div 
                key={key} 
                className={`brutal-card border-4 border-black p-8 flex flex-col justify-between transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] ${
                  isConsultoria ? 'bg-brutal-yellow' : 'bg-white'
                }`}
              >
                <div className="space-y-6">
                  {(isConsultoria || isUgc) && (
                    <span className="inline-block bg-black text-white text-xs font-black px-2.5 py-1 uppercase rounded tracking-wider">
                      Nuevo / New
                    </span>
                  )}
                  <div>
                    <h3 className="text-2xl font-black uppercase text-black">
                      {isConsultoria ? (
                        <>
                          Consultor<span className="text-purple-600 text-[1.25em] ml-0.5 inline-block">IA</span>
                        </>
                      ) : (
                        t(`plans.${key}.name`)
                      )}
                    </h3>
                    <p className="text-xs font-black uppercase tracking-wider text-gray-500 mt-1">
                      {t(`plans.${key}.bestFor`)}
                    </p>
                  </div>
                  
                  <div className="text-5xl font-black text-black tracking-tight">
                    {t(`plans.${key}.price`)}
                  </div>

                  <ul className="space-y-3 pt-4 border-t-2 border-dashed border-black/20">
                    {/* Access translation array for features */}
                    {[0, 1, 2, 3, 4, 5].map((idx) => {
                      try {
                        const feature = t(`plans.${key}.features.${idx}`);
                        if (!feature) return null;
                        return (
                          <li key={idx} className="text-sm font-bold text-black flex items-start gap-2">
                            <span className="text-black font-black">✓</span>
                            <span>{feature}</span>
                          </li>
                        );
                      } catch {
                        return null;
                      }
                    })}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href={isConsultoria ? "/consultoria" : "/presale"} 
                    className="w-full text-center brutal-btn bg-black text-white font-black py-4 block hover:bg-brutal-pink transition-all uppercase border-2 border-black"
                  >
                    {isConsultoria ? "Diagnóstico / Diagnostic" : "Comenzar / Start"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm font-black uppercase opacity-60 tracking-[0.2em]">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};
