'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Info, Layout, ShoppingCart, Cpu, HelpCircle } from 'lucide-react';
import { VISUAL_STYLES } from '../constants/styles';
import { INDUSTRIES, GOALS, PROJECT_TYPES } from '../constants/questions';
import { PLAN_DETAILS } from '../constants/plans';
import { ProjectType, FunnelState } from '../types';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export default function FunnelContainer() {
  const [state, setState] = useState<FunnelState & { otherValue: string }>({
    currentStep: 0,
    projectType: null,
    answers: {},
    contact: {
      name: '',
      email: '',
      businessName: '',
    },
    otherValue: '',
  });

  const nextStep = () => setState(s => ({ ...s, currentStep: s.currentStep + 1 }));
  const prevStep = () => setState(s => ({ ...s, currentStep: Math.max(0, s.currentStep - 1) }));

  const setAnswer = (key: string, value: any) => {
    setState(s => ({
      ...s,
      answers: { ...s.answers, [key]: value }
    }));
  };

  const handleSubmit = async () => {
    // Determine the recommended plan and price (moved logic here for saving)
    let recommendedPlan = 'Starter Landing';
    if (state.projectType === 'ecommerce') recommendedPlan = 'Online Store';
    if (state.projectType === 'webapp' || state.answers.pages === '10+') recommendedPlan = 'Platform Lite';
    
    const price = PLAN_DETAILS[recommendedPlan as keyof typeof PLAN_DETAILS]?.price || '$TBD';

    try {
      await supabase.from('funnel_leads').insert({
        name: state.contact.name,
        email: state.contact.email,
        business_name: state.contact.businessName,
        industry: state.answers.industry,
        goal: state.answers.goal,
        visual_style: state.answers.visualStyle,
        project_type: state.projectType,
        specific_details: state.answers,
        recommended_plan: recommendedPlan,
        estimated_price: price
      });
    } catch (error) {
      console.error('Error saving lead:', error);
    }
    
    nextStep();
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center py-12">
            <h2 className="text-5xl font-black uppercase mb-8 leading-none">
              LET'S BUILD YOUR <span className="bg-brutal-yellow px-2">SOLUTION</span> IN LESS THAN 48 HOURS.
            </h2>
            <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto">
              Answer a few quick questions. We'll guide you through the process of defining your brand and goals.
            </p>
            <button 
              onClick={nextStep} 
              className="brutal-btn bg-black text-white text-3xl px-16 py-8 hover:bg-brutal-pink transition-all"
            >
              START THE FUNNEL
            </button>
          </div>
        );

      case 1: // Project Type
        return (
          <div>
            <h3 className="text-4xl font-black uppercase mb-12 text-center">What do you need to build?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECT_TYPES.map(opt => {
                const Icon = opt.id === 'landing' ? Layout : 
                             opt.id === 'ecommerce' ? ShoppingCart : 
                             opt.id === 'webapp' ? Cpu : HelpCircle;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setState(s => ({ ...s, projectType: opt.id as ProjectType }));
                      nextStep();
                    }}
                    className={`brutal-card group text-left p-8 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none ${state.projectType === opt.id ? 'bg-brutal-yellow translate-x-2 translate-y-2 shadow-none' : 'bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-black text-white p-3 border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
                        <Icon size={32} strokeWidth={3} />
                      </div>
                      <span className="text-2xl font-black uppercase">{opt.label}</span>
                    </div>
                    <p className="font-bold opacity-70">
                      {opt.id === 'landing' ? 'One page designed for maximum lead capture.' : 
                       opt.id === 'ecommerce' ? 'A full online store to sell products or services.' : 
                       opt.id === 'webapp' ? 'A custom platform with specific business logic.' : 
                       'Help us recommend the best solution for you.'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2: // Goal
        return (
          <div>
            <h3 className="text-4xl font-black uppercase mb-12 text-center">What is your main goal?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => {
                    setAnswer('goal', goal);
                    nextStep();
                  }}
                  className={`brutal-card text-left p-6 font-black uppercase transition-all ${state.answers.goal === goal ? 'bg-brutal-cyan translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-brutal-gray/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Industry
        return (
          <div>
            <h3 className="text-4xl font-black uppercase mb-12 text-center">What industry are you in?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INDUSTRIES.map(industry => (
                <button
                  key={industry}
                  onClick={() => {
                    setAnswer('industry', industry);
                    nextStep();
                  }}
                  className={`brutal-card text-left p-4 font-black uppercase text-sm transition-all ${state.answers.industry === industry ? 'bg-brutal-pink translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-brutal-gray/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // Visual Style
        return (
          <div className="w-full">
            <h3 className="text-4xl font-black uppercase mb-2 text-center">Choose your visual style</h3>
            <p className="text-center font-bold mb-12 uppercase tracking-tight opacity-70">No design skills needed. Pick the vibe that fits.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VISUAL_STYLES.map(style => (
                <div 
                  key={style.id}
                  className={`brutal-card p-0 overflow-hidden flex flex-col group transition-all ${state.answers.visualStyle === style.id ? 'ring-8 ring-black bg-brutal-gray/5' : 'bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  <div className="h-48 bg-black border-b-4 border-black relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <span className="text-white font-black text-3xl uppercase italic tracking-tighter group-hover:scale-110 transition-transform">{style.name}</span>
                      <div className="flex gap-2">
                        {style.colors.map(c => (
                          <div key={c} className="w-8 h-8 border-2 border-white shadow-md" style={{ backgroundColor: c }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-black text-2xl mb-4 uppercase">{style.name}</h4>
                    <p className="font-bold mb-8 opacity-80 leading-snug">{style.description}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setAnswer('visualStyle', style.id);
                          nextStep();
                        }}
                        className="brutal-btn bg-black text-white flex-1 py-3 text-sm"
                      >
                        CHOOSE THIS STYLE
                      </button>
                      <button className="brutal-btn bg-white text-black p-3 hover:bg-brutal-yellow transition-colors">
                        <Info size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5: // Project Specifics
        if (state.projectType === 'landing' || state.projectType === 'not_sure') {
          // If landing or not sure, we can go straight to contact
          nextStep();
          return null;
        }

        const isEcommerce = state.projectType === 'ecommerce';
        const isWebApp = state.projectType === 'webapp';

        return (
          <div className="max-w-2xl mx-auto w-full">
            <h3 className="text-4xl font-black uppercase mb-12 text-center">
              {isEcommerce ? 'Ecommerce Details' : 'App Details'}
            </h3>
            <div className="space-y-8">
              {isEcommerce && (
                <div>
                  <label className="block font-black uppercase text-sm mb-4">How many products/services initially?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['1-5', '6-10', '11-20', 'More than 20'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setAnswer('productCount', opt)}
                        className={`brutal-card p-4 font-bold uppercase transition-all ${state.answers.productCount === opt ? 'bg-brutal-yellow translate-x-1 translate-y-1 shadow-none' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isWebApp && (
                <div>
                  <label className="block font-black uppercase text-sm mb-4">What tool do you need most?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Lead Tracker', 'Booking System', 'Client Portal', 'Custom Dashboard', 'Other'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setAnswer('appType', opt)}
                        className={`brutal-card p-4 font-bold uppercase transition-all ${state.answers.appType === opt ? 'bg-brutal-cyan translate-x-1 translate-y-1 shadow-none' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-12">
                <button 
                  disabled={(isEcommerce && !state.answers.productCount) || (isWebApp && !state.answers.appType)}
                  onClick={nextStep}
                  className="brutal-btn bg-black text-white w-full py-6 text-2xl disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  CONTINUE TO CONTACT
                </button>
              </div>
            </div>
          </div>
        );

      case 6: // Contact Info
        return (
          <div className="max-w-xl mx-auto w-full">
            <h3 className="text-4xl font-black uppercase mb-12 text-center">LAST STEP: WHO ARE WE BUILDING FOR?</h3>
            <div className="space-y-8 text-left">
              <div className="group">
                <label className="block font-black uppercase text-xs mb-2 tracking-widest">YOUR NAME</label>
                <input 
                  type="text" 
                  value={state.contact.name}
                  onChange={e => setState(s => ({ ...s, contact: { ...s.contact, name: e.target.value } }))}
                  className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1" 
                  placeholder="e.g. Alex Rivera"
                />
              </div>
              <div className="group">
                <label className="block font-black uppercase text-xs mb-2 tracking-widest">WORK EMAIL</label>
                <input 
                  type="email" 
                  value={state.contact.email}
                  onChange={e => setState(s => ({ ...s, contact: { ...s.contact, email: e.target.value } }))}
                  className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1" 
                  placeholder="alex@business.com"
                />
              </div>
              <div className="group">
                <label className="block font-black uppercase text-xs mb-2 tracking-widest">BUSINESS NAME</label>
                <input 
                  type="text" 
                  value={state.contact.businessName}
                  onChange={e => setState(s => ({ ...s, contact: { ...s.contact, businessName: e.target.value } }))}
                  className="w-full p-4 border-4 border-black text-lg font-bold placeholder:opacity-30 focus:outline-none transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1" 
                  placeholder="e.g. Rivera Design Studio"
                />
              </div>
              <button 
                disabled={!state.contact.name || !state.contact.email}
                onClick={handleSubmit} 
                className="brutal-btn bg-gray-500 text-white w-full py-6 text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2"
              >
                GENERATE SUMMARY
              </button>
            </div>
          </div>
        );

      case 7: // Final Summary
        const recommendedPlan = state.projectType === 'landing' ? 'Starter Landing' : 
                                state.projectType === 'ecommerce' ? 'Online Store Launch' : 
                                'Business Platform Lite';
        const price = state.projectType === 'landing' ? '$650' : 
                      state.projectType === 'ecommerce' ? '$1,850' : 
                      '$3,950+';

        return (
          <div className="text-center py-8">
            <div className="inline-block bg-brutal-green border-4 border-black p-6 mb-8 rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Check size={64} className="text-black" strokeWidth={4} />
            </div>
            <h2 className="text-5xl font-black mb-4 uppercase leading-none">Your 48-Hour Plan is Ready!</h2>
            <p className="text-xl font-bold mb-12 uppercase opacity-70">Based on your answers, here is your project roadmap.</p>
            
            <div className="brutal-card bg-white text-left mb-12 max-w-2xl mx-auto border-8 p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-8 border-black pb-8 mb-8 flex justify-between items-end flex-wrap gap-4">
                <div>
                  <p className="font-black uppercase text-sm mb-2 opacity-60">Recommended Solution</p>
                  <h4 className="text-4xl font-black uppercase text-black">{recommendedPlan}</h4>
                </div>
                <div className="text-5xl font-black bg-brutal-yellow px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {price}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold uppercase border-t-8 border-black pt-8">
                <div className="space-y-4">
                  <p className="text-xs opacity-50 font-black">What's Included</p>
                  <ul className="space-y-2">
                    {PLAN_DETAILS[recommendedPlan as keyof typeof PLAN_DETAILS]?.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 bg-brutal-green border border-black rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <p className="text-xs opacity-50 font-black">Project Details</p>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-4 h-4 bg-brutal-pink border-2 border-black"></div>
                    <span>Style: {state.answers.visualStyle?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-4 h-4 bg-brutal-cyan border-2 border-black"></div>
                    <span>Goal: {state.answers.goal}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-4 h-4 bg-brutal-yellow border-2 border-black"></div>
                    <span>Industry: {state.answers.industry}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => window.location.reload()} 
                className="brutal-btn bg-black text-white text-3xl px-16 py-8 hover:bg-brutal-green transition-all"
              >
                RESERVE MY 48H SLOT
              </button>
            </div>
            <p className="mt-8 font-black uppercase text-xs opacity-50">No credit card required to start the review.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Progress Bar */}
      {state.currentStep > 0 && state.currentStep < 7 && (
        <div className="w-full bg-black h-6 mb-16 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(state.currentStep / 7) * 100}%` }}
            className="bg-brutal-yellow h-full border-r-4 border-black"
          />
        </div>
      )}

      <div className="min-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {state.currentStep > 0 && state.currentStep < 7 && (
        <div className="flex justify-between mt-16 pt-8 border-t-4 border-black border-dashed">
          <button 
            onClick={prevStep}
            className="brutal-btn bg-white text-black flex items-center gap-2 px-8 py-3 font-black uppercase"
          >
            <ChevronLeft size={24} strokeWidth={3} /> Back
          </button>
          
          <div className="hidden sm:flex items-center font-black uppercase text-xs opacity-50 tracking-widest">
            Step {state.currentStep} of 7
          </div>

          <div className="w-32">
          </div>
        </div>
      )}
    </div>
  );
}
