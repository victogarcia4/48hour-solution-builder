'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SOLUTIONS = [
  { src: '/Edunexia home page.png', alt: 'Edunexia' },
  { src: '/extra cerdit app home.png', alt: 'Extra Credit App' },
  { src: '/portfolio VAGR.png', alt: 'Portfolio VAGR' },
  { src: '/pregnancy app home.png', alt: 'Pregnancy App' },
  { src: '/prompt optimizer home page.png', alt: 'Prompt Optimizer' },
  { src: '/QR code generator home.png', alt: 'QR Code Generator' },
  { src: '/saile portfolio.png', alt: 'Saile Portfolio' },
  { src: '/Test MIDAS migraine app home.png', alt: 'Test MIDAS Migraine App' },
];

// Duplicate for seamless loop
const TRACK = [...SOLUTIONS, ...SOLUTIONS];

export const Partners = () => {
  const t = useTranslations('partners');

  return (
    <section className="bg-brutal-yellow py-20 border-b-4 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-3">
          {t('eyebrow')}
        </p>
        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
          {t('title')} <span className="bg-black text-brutal-yellow px-3">{t('titleHighlight')}</span>
        </h2>
        <p className="text-lg font-bold mt-4 opacity-70 uppercase tracking-wide">
          {t('subtitle')}
        </p>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full overflow-hidden border-y-4 border-black bg-white py-4">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {TRACK.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 h-44 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white relative"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs font-black uppercase px-3 py-1 tracking-widest truncate">
                {item.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
