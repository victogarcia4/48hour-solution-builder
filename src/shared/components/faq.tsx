'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const faqs = [
    {
      question: "How is 48 hours possible?",
      answer: "We've removed all the traditional agency bottlenecks. No long meetings, no custom proposals for every project, and a guided funnel that collects everything we need in minutes. We use lean development patterns and AI-assisted workflows to build your finished product fast."
    },
    {
      question: "Is it a mockup or a finished site?",
      answer: "It's a 100% finished, functional, and responsive product. We don't deliver MVPs or mockups. You get a live website, store, or app ready for your customers."
    },
    {
      question: "What if I don't have my content ready?",
      answer: "Our funnel asks specific questions about your business goals and industry. We then use that information to generate high-quality AI-assisted copy as a base. You can review and suggest up to 2 revisions."
    },
    {
      question: "Can I add custom features later?",
      answer: "Yes. All our products are built with scalability in mind. You can start with a 48-hour solution and add complex features, integrations, or more pages as your business grows."
    }
  ];

  return (
    <section id="faq" className="bg-brutal-violet py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 text-center leading-none">
          Got <span className="bg-white px-2">Questions?</span>
        </h2>
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>

        <div className="text-center bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <h3 className="text-3xl font-black uppercase mb-6">Any other questions?</h3>
          <p className="text-xl font-bold mb-8 opacity-80 uppercase tracking-tight">
            We're here to help you solve your digital problems fast.
          </p>
          <a 
            href="#contact" 
            className="brutal-btn bg-black text-white text-xl px-12 py-5"
          >
            FILL THE CONTACT FORM
          </a>
        </div>
      </div>
    </section>
  );
};
