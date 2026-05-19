'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-6 border-4 border-black font-black uppercase text-lg flex justify-between items-center transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none bg-white ${isOpen ? 'bg-brutal-yellow translate-x-1 translate-y-1 shadow-none' : ''}`}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp strokeWidth={4} /> : <ChevronDown strokeWidth={4} />}
      </button>
      {isOpen && (
        <div className="p-8 border-x-4 border-b-4 border-black bg-white font-bold text-lg leading-relaxed shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-1 translate-y-1 shadow-none">
          {answer}
        </div>
      )}
    </div>
  );
};

export const FAQ = () => {
  const t = useTranslations('faq');
  const faqs = t.raw('items');

  return (
    <section id="faq" className="bg-brutal-violet py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 text-center leading-none">
          {t('title')} <span className="bg-white px-2">{t('titleHighlight')}</span>
        </h2>
        <div className="space-y-4 mb-16">
          {faqs.map((faq: any, index: number) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>

        <div className="text-center bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <h3 className="text-3xl font-black uppercase mb-6">{t('followupTitle')}</h3>
          <p className="text-xl font-bold mb-8 opacity-80 uppercase tracking-tight">
            {t('followupDesc')}
          </p>
          <a
            href="#contact"
            className="brutal-btn bg-black text-white text-xl px-12 py-5"
          >
            {t('followupCta')}
          </a>
        </div>
      </div>
    </section>
  );
};
