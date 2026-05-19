'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export const WhyPossible = () => {
  const t = useTranslations('whyPossible');
  const locale = useLocale();
  const icons = ['🎯', '🤖', '📐', '⚡'];

  const videoSrc = locale === 'es'
    ? '/48 hours how it works SP.mp4'
    : '/48hours how it works EN.mp4';

  return (
    <section id="how-it-works" className="bg-white py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 leading-none">
            {t('title')} <br />
            <span className="bg-brutal-yellow px-2">{t('titleHighlight')}</span>
          </h2>
          <p className="text-xl font-bold max-w-3xl mx-auto opacity-80">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {t.raw('reasons').map((reason: any, index: number) => (
            <div key={index} className="brutal-card bg-white hover:bg-brutal-cyan transition-colors group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{icons[index]}</div>
              <h3 className="text-2xl font-black uppercase mb-4">{reason.title}</h3>
              <p className="font-bold opacity-80 leading-snug">{reason.desc}</p>
            </div>
          ))}
        </div>

        {/* Video + CTA */}
        <div className="flex flex-col items-center gap-10">
          <div className="w-full max-w-4xl">
            <div className="bg-black text-white font-black uppercase text-sm px-4 py-2 border-4 border-black border-b-0 inline-block tracking-widest">
              ▶ WATCH HOW IT WORKS
            </div>
            <div className="border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <video
                src={`${videoSrc}#t=0.001`}
                controls
                className="w-full aspect-video"
                preload="auto"
              />
            </div>
          </div>

          <div className="text-center space-y-5">
            <p className="text-lg font-bold uppercase tracking-widest opacity-70">
              {t('videoCtaSubtext')}
            </p>
            <a
              href="/presale"
              className="brutal-btn bg-brutal-yellow text-black text-xl px-14 py-5 hover:shadow-none transition-all inline-block font-black uppercase"
            >
              {t('videoCta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
