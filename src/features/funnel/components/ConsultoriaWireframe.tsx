'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Clock,
  ArrowRight,
  Users,
  TrendingUp,
  BarChart3,
  Database,
  Settings,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Globe
} from 'lucide-react';

// Import the questions from the JSON schema
import questionsData from '../constants/consultoria-questions.json';

type Language = 'es' | 'en';

export default function ConsultoriaWireframe() {
  const [lang, setLang] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');

  // Onboarding Form State
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({
    company_name: '',
    critical_dependency: '',
    current_goal: 'reduce_costs',
    lead_generation: [],
    marketing_automation: 'none',
    sales_bottleneck: 'slow_followup',
    crm_adoption: 'memory',
    delivery_manual_ratio: 3,
    delivery_documentation: 'none',
    billing_process: 'manual',
    data_silos: 'no',
  });

  // Current active question in Phase B (one question per page)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [onboardingSubStep, setOnboardingSubStep] = useState<'phase_a' | 'phase_b'>('phase_a');

  // Copy translations dictionary
  const copy = {
    es: {
      tag: "NUEVO SERVICIO",
      heroTitle: "De la Confusión al Roadmap de IA en",
      heroTitleAccent: "48 Horas",
      heroSubtitle: "Auditoría de procesos de negocio inteligente. Identificamos tus cuellos de botella operativos en Marketing, Ventas, Operaciones y Finanzas y creamos tu plan de implementación en tiempo récord.",
      ctaStart: "Iniciar Diagnóstico Gratis",
      ctaDemo: "Ver Dashboard Demo",
      countdownTitle: "Garantía de Entrega 48h",
      countdownDesc: "Tu plan de optimización personalizado con IA entregado dentro de las 48 horas posteriores a tu sesión inicial de onboarding.",
      howItWorks: "Cómo Funciona",
      howSteps: [
        { title: "1. Auditoría Inicial", desc: "Responde nuestro cuestionario de 10 minutos enfocado en tus procesos críticos." },
        { title: "2. Sesión Estratégica", desc: "Reunión de 30 minutos para validar dependencias de datos y priorizar oportunidades." },
        { title: "3. Entrega del Roadmap", desc: "Recibe tu plan de acción accionable con stack sugerido y cotización en 48 horas." }
      ],
      pillarsTitle: "Los 4 Pilares de la Auditoría",
      pillars: {
        marketing: { title: "Marketing", desc: "Evaluación de generación de prospectos y automatización de alcance." },
        sales: { title: "Ventas", desc: "Optimización de velocidad de respuesta, seguimiento e historial en CRM." },
        delivery: { title: "Operaciones (Delivery)", desc: "Reducción de tareas repetitivas y documentación para entrega autónoma." },
        admin: { title: "Administración", desc: "Conexión de herramientas financieras, facturación y contratos sin fricción." }
      },
      diagnosticSpeed: "Velocidad de Respuesta Garantizada",
      auditProgress: "Progreso de la Auditoría",
      phaseA: "Fase A: Información General",
      phaseB: "Fase B: Auditoría de Pilares",
      next: "Siguiente",
      back: "Atrás",
      finish: "Ver Resultados Preliminares",
      dashboardTitle: "Dashboard de Diagnóstico Preliminar",
      dashboardSubtitle: "Análisis en tiempo real basado en tus respuestas actuales.",
      bottlenecks: "Cuellos de Botella Detectados",
      opportunities: "Oportunidades de IA Sugeridas",
      impactScore: "Puntuación de Impacto Potencial",
      recalculate: "Volver a Iniciar",
      submitReal: "Agendar Entrega de Roadmap 48h"
    },
    en: {
      tag: "NEW SERVICE",
      heroTitle: "From Confusion to AI Roadmap in",
      heroTitleAccent: "48 Hours",
      heroSubtitle: "Intelligent business process audit. We identify your operational bottlenecks in Marketing, Sales, Operations, and Finance to craft your implementation plan in record time.",
      ctaStart: "Start Free Diagnostic",
      ctaDemo: "View Demo Dashboard",
      countdownTitle: "48h Delivery Guarantee",
      countdownDesc: "Your custom AI optimization roadmap delivered within 48 hours of your initial onboarding session.",
      howItWorks: "How It Works",
      howSteps: [
        { title: "1. Initial Audit", desc: "Complete our 10-minute form focused on your critical business processes." },
        { title: "2. Strategic Session", desc: "A 30-minute validation call to map data dependencies and prioritize quick wins." },
        { title: "3. Roadmap Delivery", desc: "Get an actionable action plan, suggested tools stack, and quotes in 48 hours." }
      ],
      pillarsTitle: "The 4 Audit Pillars",
      pillars: {
        marketing: { title: "Marketing", desc: "Evaluation of lead generation flow and automated campaign reach." },
        sales: { title: "Sales", desc: "Response speed optimization, pipelines, and structured CRM tracking." },
        delivery: { title: "Operations (Delivery)", desc: "Reducing repetitive workflow steps and building autonomous delivery." },
        admin: { title: "Administration", desc: "Connecting financial tools, invoicing, and contract generation seamlessly." }
      },
      diagnosticSpeed: "Guaranteed Turnaround Speed",
      auditProgress: "Audit Progress",
      phaseA: "Phase A: General Onboarding",
      phaseB: "Phase B: Pillars Deep-Dive",
      next: "Next",
      back: "Back",
      finish: "View Preliminary Results",
      dashboardTitle: "Preliminary Diagnostic Dashboard",
      dashboardSubtitle: "Real-time analysis based on your current answers.",
      bottlenecks: "Detected Bottlenecks",
      opportunities: "Suggested AI Opportunities",
      impactScore: "Potential Impact Score",
      recalculate: "Restart Diagnostic",
      submitReal: "Schedule 48h Roadmap Delivery"
    }
  };

  const currentCopy = copy[lang];
  const modulesList = ['marketing', 'sales', 'delivery', 'admin'] as const;

  // Flattened Phase B question list: one page per question across the 4 pillars
  const phaseBQuestions = modulesList.flatMap((moduleKey) =>
    ((questionsData.phases.phase_b.modules as any)[moduleKey].questions as any[]).map((question) => ({
      moduleKey,
      question,
    }))
  );

  // Onboarding logic helper functions
  const handleInputChange = (id: string, value: any) => {
    setFormAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, optionValue: string) => {
    setFormAnswers(prev => {
      const currentList = prev[id] || [];
      if (currentList.includes(optionValue)) {
        return { ...prev, [id]: currentList.filter((item: string) => item !== optionValue) };
      } else {
        return { ...prev, [id]: [...currentList, optionValue] };
      }
    });
  };

  // Automated scoring for the diagnostic dashboard
  const calculateAnalysis = () => {
    let score = 0;
    const bottlenecksList: string[] = [];
    const opportunitiesList: string[] = [];

    // General Goal logic
    if (formAnswers.current_goal === 'reduce_costs') {
      score += 20;
    } else if (formAnswers.current_goal === 'increase_sales') {
      score += 25;
    }

    // Critical dependency risk
    if (formAnswers.critical_dependency && formAnswers.critical_dependency.trim().length > 0) {
      bottlenecksList.push(
        lang === 'es'
          ? `Dependencia crítica en "${formAnswers.critical_dependency}" representa un cuello de botella si se ausenta.`
          : `Critical dependency on "${formAnswers.critical_dependency}" is a single point of failure.`
      );
      opportunitiesList.push(
        lang === 'es'
          ? `Crear una base de conocimiento interna estructurada con un modelo de IA para automatizar las consultas del equipo.`
          : `Create an internal knowledge base structured with an AI model to automate team queries.`
      );
    }

    // Marketing Audit
    if (formAnswers.marketing_automation === 'none') {
      bottlenecksList.push(
        lang === 'es' ? "Falta de seguimiento de prospectos en frío y automatización de emails." : "No automation for cold prospects or email followups."
      );
      opportunitiesList.push(
        lang === 'es' ? "Implementar automatización de flujos de correo y seguimiento automatizado." : "Deploy automated email workflows and follow-ups."
      );
    }

    // Sales Audit
    if (formAnswers.sales_bottleneck === 'slow_followup') {
      bottlenecksList.push(
        lang === 'es' ? "Lentitud en respuesta inicial a nuevos prospectos, afectando la conversión." : "Slow response time to new prospects, decreasing conversion rates."
      );
      opportunitiesList.push(
        lang === 'es' ? "Integrar respuestas instantáneas automatizadas para leads entrantes." : "Integrate automated instant responses for incoming leads."
      );
    } else if (formAnswers.sales_bottleneck === 'proposal_creation') {
      bottlenecksList.push(
        lang === 'es' ? "Alta inversión de tiempo manual redactando propuestas de servicio." : "High manual time spent drafting custom proposals."
      );
      opportunitiesList.push(
        lang === 'es' ? "Desarrollar un generador de propuestas semi-automatizado potenciado por modelos de lenguaje." : "Build a semi-automated proposal builder powered by language models."
      );
    }

    // Delivery Audit
    if (formAnswers.delivery_manual_ratio >= 4) {
      bottlenecksList.push(
        lang === 'es' ? "Entrega del servicio 80-100% manual. Riesgo operativo alto al escalar." : "Service delivery is 80-100% manual. High operational risk when scaling."
      );
      opportunitiesList.push(
        lang === 'es' ? "Automatizar el onboarding de clientes y la creación de carpetas de proyecto automáticas." : "Automate client onboarding and workspace/folder generation."
      );
    }

    // Admin Audit
    if (formAnswers.billing_process === 'manual') {
      bottlenecksList.push(
        lang === 'es' ? "Facturación y contratos gestionados de forma manual." : "Invoicing and contracts managed manually."
      );
      opportunitiesList.push(
        lang === 'es' ? "Integración nativa de pasarela de pago en línea y contratos digitales autogenerados." : "Native integration of an online payment gateway and autogenerated digital contracts."
      );
    }

    // Baseline fallback answers if form is not filled
    if (bottlenecksList.length === 0) {
      bottlenecksList.push(lang === 'es' ? "Dependencias operativas manuales sin unificar." : "Siloed manual operations.");
    }
    if (opportunitiesList.length === 0) {
      opportunitiesList.push(lang === 'es' ? "Integración de flujos de sincronización de datos para transferir información automáticamente." : "Integrate data syncing flows to transfer information automatically.");
    }

    const calculatedScore = Math.min(Math.max(score + (bottlenecksList.length * 15), 30), 95);

    return {
      score: calculatedScore,
      bottlenecks: bottlenecksList,
      opportunities: opportunitiesList
    };
  };

  const analysis = calculateAnalysis();

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white font-sans antialiased overflow-x-hidden border-4 border-black">
      {/* Header bar / Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0d0d12]/90 backdrop-blur-md border-b-4 border-black px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Sparkles className="text-yellow-300 w-6 h-6 animate-pulse" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            48HOURS.live <span className="text-gray-300">/ Consultor</span><span className="text-purple-500 text-[1.25em] ml-0.5 inline-block">IA</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1 border-2 border-black bg-zinc-900 px-3 py-1.5 rounded font-black text-xs hover:bg-zinc-800 transition shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          >
            <Globe size={14} className="text-purple-400" />
            {lang === 'es' ? 'ES' : 'EN'}
          </button>

          <button
            onClick={() => setCurrentStep('landing')}
            className="hidden md:block font-black text-sm uppercase text-gray-400 hover:text-white transition"
          >
            Home
          </button>
        </div>
      </header>

      {/* Main Body Containers */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">

          {/* 1. LANDING PAGE STATE */}
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {/* Hero Section */}
              <div className="relative border-4 border-black bg-zinc-950 p-8 md:p-16 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-3xl space-y-6 relative z-10">
                  <span className="inline-block bg-purple-900/50 border-2 border-purple-500 text-purple-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-bounce">
                    {currentCopy.tag}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">
                    {currentCopy.heroTitle}{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent">
                      {currentCopy.heroTitleAccent}
                    </span>
                  </h1>
                  <p className="text-lg md:text-2xl font-semibold text-gray-400">
                    {currentCopy.heroSubtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep('onboarding')}
                      className="flex items-center justify-center gap-2 border-4 border-black bg-purple-600 hover:bg-purple-700 text-white font-black text-xl px-8 py-5 rounded-2xl transition shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    >
                      {currentCopy.ctaStart}
                      <ArrowRight size={24} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => setCurrentStep('dashboard')}
                      className="border-4 border-black bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xl px-8 py-5 rounded-2xl transition shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                    >
                      {currentCopy.ctaDemo}
                    </button>
                  </div>
                </div>
              </div>

              {/* Turnaround Component */}
              <div className="grid md:grid-cols-12 gap-8 items-center bg-gradient-to-r from-purple-950/40 to-black p-8 md:p-12 border-4 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400 text-black p-2.5 rounded-xl border-2 border-black">
                      <Clock size={28} className="animate-spin" style={{ animationDuration: '10s' }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase">
                      {currentCopy.countdownTitle}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-lg">
                    {currentCopy.countdownDesc}
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="border-4 border-black bg-zinc-950 px-8 py-6 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center w-full max-w-[280px]">
                    <span className="text-6xl font-black tracking-tighter text-yellow-300">48h</span>
                    <span className="block text-xs uppercase font-black tracking-wider text-gray-500 mt-1">
                      {currentCopy.diagnosticSpeed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Area Pillars */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
                  {currentCopy.pillarsTitle}
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                  {/* Pillar 1 */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl hover:border-purple-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl transition group-hover:bg-purple-500/20"></div>
                    <div className="bg-purple-900/60 p-3 rounded-lg border-2 border-black inline-block mb-4">
                      <TrendingUp className="text-purple-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">{currentCopy.pillars.marketing.title}</h4>
                    <p className="text-sm text-gray-400 font-medium">{currentCopy.pillars.marketing.desc}</p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl hover:border-cyan-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl transition group-hover:bg-cyan-500/20"></div>
                    <div className="bg-cyan-900/60 p-3 rounded-lg border-2 border-black inline-block mb-4">
                      <BarChart3 className="text-cyan-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">{currentCopy.pillars.sales.title}</h4>
                    <p className="text-sm text-gray-400 font-medium">{currentCopy.pillars.sales.desc}</p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl hover:border-emerald-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl transition group-hover:bg-emerald-500/20"></div>
                    <div className="bg-emerald-900/60 p-3 rounded-lg border-2 border-black inline-block mb-4">
                      <Database className="text-emerald-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">{currentCopy.pillars.delivery.title}</h4>
                    <p className="text-sm text-gray-400 font-medium">{currentCopy.pillars.delivery.desc}</p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl hover:border-yellow-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl transition group-hover:bg-yellow-500/20"></div>
                    <div className="bg-yellow-900/60 p-3 rounded-lg border-2 border-black inline-block mb-4">
                      <Settings className="text-yellow-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">{currentCopy.pillars.admin.title}</h4>
                    <p className="text-sm text-gray-400 font-medium">{currentCopy.pillars.admin.desc}</p>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
                  {currentCopy.howItWorks}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {currentCopy.howSteps.map((step, idx) => (
                    <div key={idx} className="border-4 border-black bg-zinc-900 p-8 rounded-2xl relative shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <span className="absolute -top-6 left-6 text-7xl font-black text-purple-500/20">{idx + 1}</span>
                      <h4 className="text-xl font-black uppercase mb-3 relative z-10">{step.title}</h4>
                      <p className="text-gray-400 text-sm font-semibold relative z-10">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. ONBOARDING & AUDIT SYSTEM */}
          {currentStep === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {/* Progress Indicator */}
              <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-lg uppercase tracking-wide">
                    {onboardingSubStep === 'phase_a' ? currentCopy.phaseA : `${currentCopy.phaseB}: ${phaseBQuestions[activeQuestionIndex].moduleKey.toUpperCase()}`}
                  </h3>
                  <span className="font-black text-xs bg-purple-900 text-purple-300 px-3 py-1 rounded-full uppercase">
                    {onboardingSubStep === 'phase_a' ? `1 / ${phaseBQuestions.length + 1}` : `${activeQuestionIndex + 2} / ${phaseBQuestions.length + 1}`}
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-black h-4 border-2 border-black rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full transition-all duration-300"
                    style={{
                      width: onboardingSubStep === 'phase_a'
                        ? `${(1 / (phaseBQuestions.length + 1)) * 100}%`
                        : `${((activeQuestionIndex + 2) / (phaseBQuestions.length + 1)) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Form Card */}
              <div className="border-4 border-black bg-zinc-950 p-8 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-8">

                {/* Phase A: General Onboarding Form Fields */}
                {onboardingSubStep === 'phase_a' && (
                  <div className="space-y-6">
                    {questionsData.phases.phase_a.questions.map((q: any) => (
                      <div key={q.id} className="space-y-2">
                        <label className="block text-lg font-black uppercase text-purple-300">
                          {lang === 'es' ? q.label_es : q.label_en}
                        </label>

                        {q.type === 'text' && (
                          <input
                            type="text"
                            value={formAnswers[q.id]}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            placeholder={q.id === 'critical_dependency' ? 'Ej. Juan Pérez (Operaciones), María (Admin)' : ''}
                            className="w-full bg-zinc-900 border-2 border-black p-4 rounded-xl font-bold focus:border-purple-500 outline-none transition text-white"
                          />
                        )}

                        {q.type === 'select' && (
                          <div className="grid gap-3">
                            {q.options.map((opt: any) => (
                              <button
                                key={opt.value}
                                onClick={() => handleInputChange(q.id, opt.value)}
                                className={`w-full text-left p-4 rounded-xl border-2 font-bold transition flex justify-between items-center ${formAnswers[q.id] === opt.value
                                  ? 'border-purple-500 bg-purple-950/20 text-white'
                                  : 'border-black bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                  }`}
                              >
                                <span>{lang === 'es' ? opt.label_es : opt.label_en}</span>
                                {formAnswers[q.id] === opt.value && <CheckCircle2 className="text-purple-400 w-5 h-5" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Phase B: Deep-Dive Audit — one question per page */}
                {onboardingSubStep === 'phase_b' && (
                  <div className="space-y-8">
                    {(() => {
                      const { moduleKey: currentModuleKey, question: q } = phaseBQuestions[activeQuestionIndex];

                      return (
                        <div key={q.id} className="space-y-6">
                          <h4 className="text-2xl font-black uppercase text-yellow-300 border-b-2 border-black pb-2 flex items-center gap-2">
                            <Sparkles size={20} />
                            {currentModuleKey.toUpperCase()}
                          </h4>

                          <div className="space-y-3">
                            <label className="block text-lg font-black uppercase text-purple-300">
                              {lang === 'es' ? q.label_es : q.label_en}
                            </label>

                            {q.type === 'select' && (
                              <div className="grid gap-3">
                                {q.options.map((opt: any) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => handleInputChange(q.id, opt.value)}
                                    className={`w-full text-left p-4 rounded-xl border-2 font-bold transition flex justify-between items-center ${formAnswers[q.id] === opt.value
                                      ? 'border-purple-500 bg-purple-950/20 text-white'
                                      : 'border-black bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                      }`}
                                  >
                                    <span>{lang === 'es' ? opt.label_es : opt.label_en}</span>
                                    {formAnswers[q.id] === opt.value && <CheckCircle2 className="text-purple-400 w-5 h-5" />}
                                  </button>
                                ))}
                              </div>
                            )}

                            {q.type === 'multiselect' && (
                              <div className="grid gap-3">
                                {q.options.map((opt: any) => {
                                  const isSelected = (formAnswers[q.id] || []).includes(opt.value);
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() => handleCheckboxChange(q.id, opt.value)}
                                      className={`w-full text-left p-4 rounded-xl border-2 font-bold transition flex justify-between items-center ${isSelected
                                        ? 'border-purple-500 bg-purple-950/20 text-white'
                                        : 'border-black bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                        }`}
                                    >
                                      <span>{lang === 'es' ? opt.label_es : opt.label_en}</span>
                                      {isSelected && <CheckCircle2 className="text-purple-400 w-5 h-5" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {q.type === 'scale' && (
                              <div className="space-y-4">
                                <div className="flex justify-between font-black text-xs text-gray-500">
                                  <span>{q.labels["1"][lang]}</span>
                                  <span>{q.labels["5"][lang]}</span>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                  {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                      key={val}
                                      onClick={() => handleInputChange(q.id, val)}
                                      className={`p-4 rounded-xl border-2 font-black text-xl transition ${formAnswers[q.id] === val
                                        ? 'border-purple-500 bg-purple-500 text-white'
                                        : 'border-black bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                        }`}
                                    >
                                      {val}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Onboarding Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t-2 border-black">
                  <button
                    onClick={() => {
                      if (onboardingSubStep === 'phase_b') {
                        if (activeQuestionIndex > 0) {
                          setActiveQuestionIndex(prev => prev - 1);
                        } else {
                          setOnboardingSubStep('phase_a');
                        }
                      } else {
                        setCurrentStep('landing');
                      }
                    }}
                    className="border-2 border-black bg-zinc-900 px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-zinc-800 transition"
                  >
                    {currentCopy.back}
                  </button>

                  <button
                    onClick={() => {
                      if (onboardingSubStep === 'phase_a') {
                        setActiveQuestionIndex(0);
                        setOnboardingSubStep('phase_b');
                      } else {
                        if (activeQuestionIndex < phaseBQuestions.length - 1) {
                          setActiveQuestionIndex(prev => prev + 1);
                        } else {
                          setCurrentStep('dashboard');
                        }
                      }
                    }}
                    className="border-4 border-black bg-purple-600 px-8 py-3 rounded-xl font-black text-sm uppercase hover:bg-purple-700 transition shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                  >
                    {onboardingSubStep === 'phase_b' && activeQuestionIndex === phaseBQuestions.length - 1
                      ? currentCopy.finish
                      : currentCopy.next}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. DIAGNOSTIC DASHBOARD PREVIEW */}
          {currentStep === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Dashboard Header Banner */}
              <div className="border-4 border-black bg-gradient-to-r from-purple-950 to-zinc-950 p-6 md:p-8 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <Sparkles className="text-yellow-400" />
                    {currentCopy.dashboardTitle}
                  </h2>
                  <p className="text-gray-400 text-sm font-semibold">{currentCopy.dashboardSubtitle}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setOnboardingSubStep('phase_a');
                      setActiveQuestionIndex(0);
                      setCurrentStep('onboarding');
                    }}
                    className="flex items-center gap-2 border-2 border-black bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-xl font-black text-xs uppercase transition shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  >
                    <RefreshCw size={14} />
                    {currentCopy.recalculate}
                  </button>
                </div>
              </div>

              {/* Grid: Bottlenecks & opportunities */}
              <div className="grid md:grid-cols-12 gap-8">

                {/* Left side: Bottlenecks vs opportunities */}
                <div className="md:col-span-8 space-y-6">

                  {/* Detected Bottlenecks block */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-xl font-black uppercase text-rose-400 flex items-center gap-2">
                      <AlertCircle size={20} />
                      {currentCopy.bottlenecks}
                    </h3>
                    <div className="space-y-3">
                      {analysis.bottlenecks.map((item, idx) => (
                        <div key={idx} className="flex gap-3 bg-rose-950/20 border-2 border-rose-900/50 p-4 rounded-xl">
                          <div className="text-rose-400 font-bold">•</div>
                          <p className="text-sm font-bold text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested AI Opportunities block */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-xl font-black uppercase text-emerald-400 flex items-center gap-2">
                      <Zap size={20} />
                      {currentCopy.opportunities}
                    </h3>
                    <div className="space-y-3">
                      {analysis.opportunities.map((item, idx) => (
                        <div key={idx} className="flex gap-3 bg-emerald-950/20 border-2 border-emerald-900/50 p-4 rounded-xl">
                          <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                          <p className="text-sm font-bold text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right side: Summary Metric Widget & Call to Action */}
                <div className="md:col-span-4 space-y-6">

                  {/* Potential Impact widget */}
                  <div className="border-4 border-black bg-zinc-950 p-6 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center space-y-4">
                    <h3 className="font-black text-sm uppercase tracking-wider text-gray-400">
                      {currentCopy.impactScore}
                    </h3>
                    <div className="relative inline-flex items-center justify-center p-2">
                      {/* Simple visual indicator rings */}
                      <div className="w-36 h-36 rounded-full border-8 border-purple-950 flex items-center justify-center">
                        <span className="text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent">
                          {analysis.score}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold px-4">
                      {lang === 'es'
                        ? 'Indica el porcentaje de eficiencia que tu negocio ganará mediante la integración de IA sugerida.'
                        : 'Represents the estimated operational efficiency gain by deploying the suggested AI features.'}
                    </p>
                  </div>

                  {/* Primary Call to Action */}
                  <button
                    onClick={() => alert(lang === 'es' ? '¡Tu solicitud ha sido enviada! Te contactaremos en menos de 48 horas.' : 'Request sent! We will contact you in less than 48 hours.')}
                    className="w-full flex items-center justify-center gap-2 border-4 border-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-lg p-5 rounded-2xl transition shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  >
                    <span>{currentCopy.submitReal}</span>
                    <ArrowRight size={20} strokeWidth={3} />
                  </button>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
