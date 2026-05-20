'use client';

/**
 * PresaleFunnelContainer — Neobrutalist bilingual presale classifier
 * Branch: feature/funnel-segmentation — DO NOT merge to main without review
 *
 * Flow: Questions (0-4) → Result + Summary → Add-ons → Schedule
 *
 * Classification matrix:
 *   tier 3 / app / organize / large  → CALL  (scope call needed)
 *   exploring / medium / no-assets   → MSG   (written proposal)
 *   clear standard scope             → DIRECT (start funnel now)
 */

import React, { useState } from 'react';
import { i18n } from '../../constants/presale-i18n';
import { classify } from '../../types/presale';
import { ADDON_CATALOG } from '../../constants/questions';
import { saveContactMessageAction } from '@/lib/supabase/server-actions';
import type {
  Lang, ProjectType, GoalType, ScaleType, AssetType, UrgencyType, PresaleAnswers,
} from '../../types/presale';

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = 'questions' | 'result' | 'addons' | 'schedule';

interface SelectedAddon { id: string; name: string; price: number; }

interface ContactForm { name: string; email: string; phone: string; message: string; }

const EMPTY_ANSWERS: PresaleAnswers = {
  projectType: null, goal: null, scale: null, assets: [], urgency: null,
};

const EMPTY_CONTACT: ContactForm = { name: '', email: '', phone: '', message: '' };

// ─── Neobrutalist primitives ──────────────────────────────────────────────────

function BrutalCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border-4 border-black shadow-brutal p-5 ${className}`}>
      {children}
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">{text}</p>
  );
}

function Opt({
  icon, label, selected, onClick,
}: { icon: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 border-4 font-bold text-sm text-left transition-all duration-100
        ${selected
          ? 'border-black bg-brutal-yellow shadow-brutal translate-x-[2px] translate-y-[2px]'
          : 'border-black bg-white hover:bg-brutal-yellow hover:shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] shadow-[2px_2px_0px_0px_#000]'
        }`}
    >
      <span className="w-8 h-8 flex items-center justify-center border-2 border-black bg-brutal-gray text-base shrink-0">
        {icon}
      </span>
      {label}
    </button>
  );
}

// ─── Progress dots + lang toggle ──────────────────────────────────────────────

function TopBar({ step, total, lang, setLang }: {
  step: number; total: number; lang: Lang; setLang: (l: Lang) => void;
}) {
  const stepKeys = ['step', 'step1', 'step2', 'step3', 'step4'] as const;
  const label = step < stepKeys.length ? i18n[lang][stepKeys[step]] : '';

  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 border-2 border-black transition-colors
              ${i < step ? 'bg-black' : i === step ? 'bg-brutal-yellow' : 'bg-white'}`}
          />
        ))}
        <span className="text-xs font-bold uppercase tracking-widest ml-1 text-gray-500">{label}</span>
      </div>
      <LangToggle lang={lang} setLang={setLang} />
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex border-2 border-black overflow-hidden">
      {(['en', 'es'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`text-xs font-black px-3 py-1 uppercase tracking-wider transition-colors
            ${lang === l ? 'bg-black text-white' : 'bg-white text-black hover:bg-brutal-gray'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// ─── Nav buttons ──────────────────────────────────────────────────────────────

function Nav({ onBack, onNext, nextLabel, nextDisabled, isFirst = false }: {
  onBack?: () => void; onNext: () => void;
  nextLabel: string; nextDisabled: boolean; isFirst?: boolean;
}) {
  return (
    <div className={`flex mt-5 ${isFirst ? 'justify-end' : 'justify-between'} items-center`}>
      {!isFirst && (
        <button
          type="button"
          onClick={onBack}
          className="brutal-btn bg-white text-black text-xs px-5 py-2 font-black uppercase"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="brutal-btn bg-brutal-yellow text-black text-xs px-5 py-2 font-black uppercase disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
      >
        {nextLabel} →
      </button>
    </div>
  );
}

// ─── Summary (shown inside Result stage) ──────────────────────────────────────

const ASSET_ICONS: Record<string, string> = { logo:'🎨', copy:'📄', photos:'📷', domain:'🌐', none:'◯' };
const TYPE_ICONS:  Record<string, string> = { landing:'🖥️', store:'🛒', app:'⚙️', unsure:'❓' };
const GOAL_ICONS:  Record<string, string> = { leads:'👤', sell:'💰', organize:'🗄️', presence:'🏪', validate:'🚀' };
const SCALE_ICONS: Record<string, string> = { small:'1️⃣', medium:'2️⃣', large:'3️⃣', unknown:'❓' };
const URGENCY_ICONS: Record<string, string> = { now:'⚡', week:'📅', month:'🗓️', exploring:'👁️' };

function AnswerSummary({ answers, lang }: { answers: PresaleAnswers; lang: Lang }) {
  const t = i18n[lang];
  const rows = [
    { icon: answers.projectType ? TYPE_ICONS[answers.projectType] : '', label: t.tag0, value: answers.projectType ? t.typeMap[answers.projectType] : '—' },
    { icon: answers.goal        ? GOAL_ICONS[answers.goal]         : '', label: t.tag1, value: answers.goal        ? { leads:'Leads', sell:'Ventas', organize:'Organizar', presence:'Presencia', validate:'Validar' }[answers.goal] ?? answers.goal : '—' },
    { icon: answers.scale       ? SCALE_ICONS[answers.scale]       : '', label: t.tag2, value: answers.scale       ? t.scaleMap[answers.scale]   : '—' },
    {
      icon: answers.assets.length ? (answers.assets.includes('none') ? '◯' : '📦') : '',
      label: t.tag3,
      value: answers.assets.length && !answers.assets.includes('none')
        ? answers.assets.map((a) => t.assetMap[a] ?? a).join(', ')
        : t.assetNone,
    },
    { icon: answers.urgency ? URGENCY_ICONS[answers.urgency] : '', label: t.tag4, value: answers.urgency ? t.timeMap[answers.urgency] : '—' },
  ];

  return (
    <div className="border-4 border-black divide-y-4 divide-black">
      {rows.map(({ icon, label, value }) => (
        <div key={label} className="flex justify-between items-center px-4 py-2.5 bg-white odd:bg-brutal-gray">
          <span className="text-xs font-black uppercase tracking-widest text-gray-500">{label}</span>
          <span className="text-sm font-bold flex items-center gap-1.5">{icon} {value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────

const RESULT_STYLE = {
  call:   { bg: 'bg-red-400',    label: '📞', border: 'border-black' },
  msg:    { bg: 'bg-brutal-orange', label: '✉️', border: 'border-black' },
  direct: { bg: 'bg-brutal-lime',   label: '✅', border: 'border-black' },
} as const;

function ResultStage({ lang, answers, onNext, onRestart }: {
  lang: Lang; answers: PresaleAnswers; onNext: () => void; onRestart: () => void;
}) {
  const t = i18n[lang];
  const { type, tier } = classify(answers);
  const rs = RESULT_STYLE[type];

  const badgeKey  = `r${type.charAt(0).toUpperCase() + type.slice(1)}_badge` as keyof typeof t;
  const titleKey  = `r${type.charAt(0).toUpperCase() + type.slice(1)}_title` as keyof typeof t;
  const whyKey    = `r${type.charAt(0).toUpperCase() + type.slice(1)}_why`   as keyof typeof t;
  const ctaKey    = `r${type.charAt(0).toUpperCase() + type.slice(1)}_cta`   as keyof typeof t;

  return (
    <section aria-label={t.resultTag}>
      {/* Header */}
      <div className={`${rs.bg} border-4 border-black p-5 mb-4`}>
        <p className="text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          {rs.label} {String(t[badgeKey])}
        </p>
        <h2 className="text-2xl font-black uppercase leading-tight">{String(t[titleKey])}</h2>
        <p className="text-sm font-medium mt-2 leading-relaxed opacity-80">{String(t[whyKey])}</p>

        {/* Tier chip */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-white">
            {t.tiers[tier] ?? t.tiers[0]}
          </span>
          {type === 'call'   && <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-white">{t.customScope}</span>}
          {type === 'msg'    && answers.assets.includes('none') && <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-white">{t.aiIncluded}</span>}
          {type === 'direct' && answers.urgency === 'now'        && <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-white">{t.delivery48}</span>}
        </div>
      </div>

      {/* Answer summary */}
      <p className="text-xs font-black uppercase tracking-widest mb-2">Your answers</p>
      <AnswerSummary answers={answers} lang={lang} />

      {/* CTA */}
      <button
        type="button"
        onClick={onNext}
        className="brutal-btn bg-black text-white w-full mt-5 py-4 font-black uppercase text-sm"
      >
        {String(t[ctaKey])} →
      </button>

      <button
        type="button"
        onClick={onRestart}
        className="brutal-btn bg-white text-black w-full mt-3 py-2.5 font-black uppercase text-xs"
      >
        ↺ {t.restart}
      </button>
    </section>
  );
}

// ─── Add-ons stage ────────────────────────────────────────────────────────────

function AddonsStage({ lang, selected, onToggle, onNext, onBack }: {
  lang: Lang;
  selected: SelectedAddon[];
  onToggle: (a: SelectedAddon) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const total = selected.reduce((s, a) => s + a.price, 0);

  const CATEGORY_LABELS: Record<string, string> = {
    branding: '🎨 Branding',
    content: '✍️ Content',
    assets: '🖼️ Assets',
    infrastructure: '🌐 Infrastructure',
    expansion: '📦 Expansion',
    functionality: '⚙️ Functionality',
    automation: '🤖 Automation',
    integrations: '🔗 Integrations',
    ai: '✨ AI',
  };

  const byCategory = ADDON_CATALOG.reduce<Record<string, typeof ADDON_CATALOG>>((acc, addon) => {
    const cat = addon.category ?? 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(addon);
    return acc;
  }, {});

  return (
    <section aria-label="Add-ons">
      <div className="bg-brutal-yellow border-4 border-black p-5 mb-5">
        <p className="text-xs font-black uppercase tracking-widest mb-1">Step 2 of 3</p>
        <h2 className="text-2xl font-black uppercase leading-tight">Customize your project</h2>
        <p className="text-sm font-medium mt-1 opacity-75">
          {lang === 'es'
            ? 'Selecciona los extras que necesitas. Puedes cambiarlos más adelante.'
            : 'Select any extras you need. You can adjust these later.'}
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(byCategory).map(([cat, addons]) => (
          <div key={cat}>
            <p className="text-xs font-black uppercase tracking-widest mb-2 text-gray-500">
              {CATEGORY_LABELS[cat] ?? cat}
            </p>
            <div className="space-y-2">
              {addons.map((addon) => {
                const isSelected = selected.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => onToggle({ id: addon.id, name: addon.name, price: addon.price })}
                    className={`w-full px-4 py-3 border-4 border-black text-left transition-all duration-100 flex justify-between items-start gap-3
                      ${isSelected
                        ? 'bg-black text-white shadow-brutal translate-x-[2px] translate-y-[2px]'
                        : 'bg-white text-black hover:bg-brutal-yellow hover:shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] shadow-[2px_2px_0px_0px_#000]'
                      }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm uppercase">{addon.name}</p>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'opacity-70' : 'text-gray-500'}`}>{addon.description}</p>
                    </div>
                    <span className="font-black text-sm shrink-0">+${addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Running total */}
      {selected.length > 0 && (
        <div className="border-4 border-black bg-brutal-lime mt-5 px-4 py-3 flex justify-between items-center">
          <p className="text-xs font-black uppercase tracking-widest">
            {selected.length} add-on{selected.length > 1 ? 's' : ''} selected
          </p>
          <p className="font-black text-lg">+${total}</p>
        </div>
      )}

      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={onBack}
          className="brutal-btn bg-white text-black text-xs px-5 py-3 font-black uppercase"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="brutal-btn bg-black text-white flex-1 py-3 font-black uppercase text-sm"
        >
          {lang === 'es' ? 'Continuar → Agendar' : 'Continue → Schedule'} →
        </button>
      </div>
    </section>
  );
}

// ─── Schedule stage ───────────────────────────────────────────────────────────

function ScheduleStage({ lang, answers, addons, onBack }: {
  lang: Lang;
  answers: PresaleAnswers;
  addons: SelectedAddon[];
  onBack: () => void;
}) {
  const t = i18n[lang];
  const [form, setForm] = useState<ContactForm>(EMPTY_CONTACT);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (k: keyof ContactForm, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim().length > 1 && form.email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setSubmitError('');

    // Build a summary message from add-ons and answers
    const addonSummary = addons.length > 0
      ? `\nAdd-ons: ${addons.map((a) => `${a.name} (+$${a.price})`).join(', ')}`
      : '';
    const answerSummary = [
      answers.projectType ? `Type: ${answers.projectType}` : '',
      answers.goal        ? `Goal: ${answers.goal}`        : '',
      answers.scale       ? `Scale: ${answers.scale}`      : '',
      answers.urgency     ? `Urgency: ${answers.urgency}`  : '',
    ].filter(Boolean).join(' | ');

    const result = await saveContactMessageAction({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      businessName: undefined,
      message: [form.message, answerSummary, addonSummary].filter(Boolean).join('\n\n'),
      source: 'presale_funnel',
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="inline-block bg-brutal-lime border-4 border-black p-6 mb-6 shadow-brutal-lg">
          <span className="text-5xl">✅</span>
        </div>
        <h2 className="text-3xl font-black uppercase mb-3">
          {lang === 'es' ? '¡Solicitud recibida!' : 'Request received!'}
        </h2>
        <p className="font-medium text-gray-600 mb-6 max-w-sm mx-auto">
          {lang === 'es'
            ? 'El equipo de 48H Studio se pondrá en contacto en menos de 24 horas para afinar tu solicitud.'
            : 'The 48H Studio team will reach out within 24 hours to finalize your request.'}
        </p>
        {addons.length > 0 && (
          <div className="border-4 border-black text-left p-4 mb-6 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase tracking-widest mb-2 text-gray-500">
              {lang === 'es' ? 'Add-ons incluidos' : 'Add-ons included'}
            </p>
            {addons.map((a) => (
              <div key={a.id} className="flex justify-between text-sm font-bold border-b border-gray-200 py-1 last:border-0">
                <span>{a.name}</span>
                <span>+${a.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section aria-label="Schedule">
      {/* Header */}
      <div className="bg-brutal-cyan border-4 border-black p-5 mb-5">
        <p className="text-xs font-black uppercase tracking-widest mb-1">Step 3 of 3</p>
        <h2 className="text-2xl font-black uppercase leading-tight">
          {lang === 'es' ? 'Agenda tu conversación' : 'Schedule your call'}
        </h2>
        <p className="text-sm font-medium mt-1 opacity-75">
          {lang === 'es'
            ? 'Comparte tus datos y el equipo te contacta para afinar tu solicitud.'
            : 'Share your info and our team will reach out to refine your request.'}
        </p>
      </div>

      {/* Mini summary */}
      <div className="border-4 border-black p-4 mb-5 bg-white">
        <p className="text-xs font-black uppercase tracking-widest mb-3 text-gray-500">
          {lang === 'es' ? 'Tu solicitud' : 'Your request'}
        </p>
        <div className="flex flex-wrap gap-2">
          {answers.projectType && (
            <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-brutal-yellow">
              {t.typeMap[answers.projectType]}
            </span>
          )}
          {answers.scale && (
            <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-brutal-gray">
              {t.scaleMap[answers.scale]}
            </span>
          )}
          {answers.urgency && (
            <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-brutal-gray">
              {t.timeMap[answers.urgency]}
            </span>
          )}
          {addons.map((a) => (
            <span key={a.id} className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-brutal-lime">
              + {a.name}
            </span>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-black uppercase tracking-widest block mb-1">
            {lang === 'es' ? 'Nombre *' : 'Name *'}
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
            className="brutal-input text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest block mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            className="brutal-input text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest block mb-1">
            {lang === 'es' ? 'WhatsApp / Teléfono' : 'WhatsApp / Phone'}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+1 555 000 0000"
            className="brutal-input text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest block mb-1">
            {lang === 'es' ? 'Cuéntanos más sobre tu proyecto' : 'Tell us more about your project'}
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder={lang === 'es' ? 'Describe brevemente tu idea...' : 'Briefly describe your idea...'}
            className="brutal-input text-sm resize-none"
          />
        </div>

        {submitError && (
          <div className="border-4 border-black bg-red-400 p-3 font-black text-sm uppercase tracking-wide">
            ⚠ {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="brutal-btn bg-white text-black text-xs px-5 py-3 font-black uppercase"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={!valid || loading}
            className="brutal-btn bg-black text-white flex-1 py-3 font-black uppercase text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
          >
            {loading
              ? (lang === 'es' ? 'Enviando...' : 'Sending...')
              : (lang === 'es' ? '🚀 Enviar y agendar llamada' : '🚀 Send & schedule call')}
          </button>
        </div>
      </form>
    </section>
  );
}

// ─── Main container ───────────────────────────────────────────────────────────

const TOTAL_Q = 5;

export function PresaleFunnelContainer() {
  const [lang, setLang]       = useState<Lang>('en');
  const [qStep, setQStep]     = useState(0);
  const [stage, setStage]     = useState<Stage>('questions');
  const [answers, setAnswers] = useState<PresaleAnswers>(EMPTY_ANSWERS);
  const [addons, setAddons]   = useState<SelectedAddon[]>([]);

  const t = i18n[lang];

  const restart = () => {
    setQStep(0); setStage('questions');
    setAnswers(EMPTY_ANSWERS); setAddons([]);
  };

  const setField = <K extends keyof PresaleAnswers>(key: K, val: PresaleAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: val }));

  const toggleAsset = (val: AssetType) => {
    setAnswers((a) => {
      if (val === 'none') return { ...a, assets: a.assets.includes('none') ? [] : ['none'] };
      const without = a.assets.filter((v) => v !== 'none');
      return { ...a, assets: without.includes(val) ? without.filter((v) => v !== val) : [...without, val] };
    });
  };

  const toggleAddon = (addon: SelectedAddon) => {
    setAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // ── Render stages ────────────────────────────────────────────────────────────

  if (stage === 'result') {
    return (
      <section className="w-full max-w-[560px] mx-auto font-brutal">
        <div className="flex justify-between items-center mb-5">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">{t.resultTag}</p>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <ResultStage
          lang={lang} answers={answers}
          onNext={() => setStage('addons')}
          onRestart={restart}
        />
      </section>
    );
  }

  if (stage === 'addons') {
    return (
      <section className="w-full max-w-[560px] mx-auto font-brutal">
        <div className="flex justify-end mb-5">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <AddonsStage
          lang={lang} selected={addons} onToggle={toggleAddon}
          onNext={() => setStage('schedule')}
          onBack={() => setStage('result')}
        />
      </section>
    );
  }

  if (stage === 'schedule') {
    return (
      <section className="w-full max-w-[560px] mx-auto font-brutal">
        <div className="flex justify-end mb-5">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <ScheduleStage
          lang={lang} answers={answers} addons={addons}
          onBack={() => setStage('addons')}
        />
      </section>
    );
  }

  // ── Questions stage ──────────────────────────────────────────────────────────

  const Card = ({ children }: { children: React.ReactNode }) => (
    <BrutalCard>{children}</BrutalCard>
  );

  const goNext = () => {
    if (qStep < TOTAL_Q - 1) setQStep((s) => s + 1);
    else setStage('result');
  };
  const goBack = () => setQStep((s) => Math.max(s - 1, 0));

  const renderQuestion = () => {
    // Step 0 — Project type
    if (qStep === 0) {
      const opts: { val: ProjectType; icon: string; key: keyof typeof t }[] = [
        { val: 'landing',  icon: '🖥️', key: 'o0_0' },
        { val: 'store',    icon: '🛒', key: 'o0_1' },
        { val: 'mini_app', icon: '📱', key: 'o0_2' },
        { val: 'app',      icon: '⚙️', key: 'o0_3' },
        { val: 'unsure',   icon: '❓', key: 'o0_4' },
      ];
      return (
        <article>
          <TopBar step={0} total={TOTAL_Q} lang={lang} setLang={setLang} />
          <Card>
            <Tag text={t.tag0} />
            <p className="text-lg font-black uppercase mb-4 leading-tight">{t.q0}</p>
            <div className="flex flex-col gap-2">
              {opts.map(({ val, icon, key }) => (
                <Opt key={val} icon={icon} label={String(t[key])}
                  selected={answers.projectType === val}
                  onClick={() => setField('projectType', val)} />
              ))}
            </div>
          </Card>
          <Nav isFirst onNext={goNext} nextLabel={t.continue} nextDisabled={!answers.projectType} />
        </article>
      );
    }

    // Step 1 — Goal
    if (qStep === 1) {
      const opts: { val: GoalType; icon: string; key: keyof typeof t }[] = [
        { val: 'leads',    icon: '👤', key: 'o1_0' },
        { val: 'sell',     icon: '💰', key: 'o1_1' },
        { val: 'organize', icon: '🗄️', key: 'o1_2' },
        { val: 'presence', icon: '🏪', key: 'o1_3' },
        { val: 'validate', icon: '🚀', key: 'o1_4' },
      ];
      return (
        <article>
          <TopBar step={1} total={TOTAL_Q} lang={lang} setLang={setLang} />
          <Card>
            <Tag text={t.tag1} />
            <p className="text-lg font-black uppercase mb-4 leading-tight">{t.q1}</p>
            <div className="flex flex-col gap-2">
              {opts.map(({ val, icon, key }) => (
                <Opt key={val} icon={icon} label={String(t[key])}
                  selected={answers.goal === val}
                  onClick={() => setField('goal', val)} />
              ))}
            </div>
          </Card>
          <Nav onBack={goBack} onNext={goNext} nextLabel={t.continue} nextDisabled={!answers.goal} />
        </article>
      );
    }

    // Step 2 — Complexity
    if (qStep === 2) {
      const opts: { val: ScaleType; icon: string; key: keyof typeof t }[] = [
        { val: 'small',   icon: '1️⃣', key: 'o2_0' },
        { val: 'medium',  icon: '2️⃣', key: 'o2_1' },
        { val: 'large',   icon: '3️⃣', key: 'o2_2' },
        { val: 'unknown', icon: '❓', key: 'o2_3' },
      ];
      return (
        <article>
          <TopBar step={2} total={TOTAL_Q} lang={lang} setLang={setLang} />
          <Card>
            <Tag text={t.tag2} />
            <p className="text-lg font-black uppercase mb-1 leading-tight">{t.q2}</p>
            <p className="text-xs text-gray-500 font-medium mb-4">{t.hint2}</p>
            <div className="flex flex-col gap-2">
              {opts.map(({ val, icon, key }) => (
                <Opt key={val} icon={icon} label={String(t[key])}
                  selected={answers.scale === val}
                  onClick={() => setField('scale', val)} />
              ))}
            </div>
          </Card>
          <Nav onBack={goBack} onNext={goNext} nextLabel={t.continue} nextDisabled={!answers.scale} />
        </article>
      );
    }

    // Step 3 — Materials (multi)
    if (qStep === 3) {
      const opts: { val: AssetType; icon: string; key: keyof typeof t }[] = [
        { val: 'logo',   icon: '🎨', key: 'o3_0' },
        { val: 'copy',   icon: '📄', key: 'o3_1' },
        { val: 'photos', icon: '📷', key: 'o3_2' },
        { val: 'domain', icon: '🌐', key: 'o3_3' },
        { val: 'none',   icon: '◯',  key: 'o3_4' },
      ];
      return (
        <article>
          <TopBar step={3} total={TOTAL_Q} lang={lang} setLang={setLang} />
          <Card>
            <Tag text={t.tag3} />
            <p className="text-lg font-black uppercase mb-1 leading-tight">{t.q3}</p>
            <p className="text-xs text-gray-500 font-medium mb-4">{t.multi3}</p>
            <div className="flex flex-col gap-2">
              {opts.map(({ val, icon, key }) => (
                <Opt key={val} icon={icon} label={String(t[key])}
                  selected={answers.assets.includes(val)}
                  onClick={() => toggleAsset(val)} />
              ))}
            </div>
          </Card>
          <Nav onBack={goBack} onNext={goNext} nextLabel={t.continue} nextDisabled={answers.assets.length === 0} />
        </article>
      );
    }

    // Step 4 — Urgency
    if (qStep === 4) {
      const opts: { val: UrgencyType; icon: string; key: keyof typeof t }[] = [
        { val: 'now',       icon: '⚡', key: 'o4_0' },
        { val: 'week',      icon: '📅', key: 'o4_1' },
        { val: 'month',     icon: '🗓️', key: 'o4_2' },
        { val: 'exploring', icon: '👁️', key: 'o4_3' },
      ];
      return (
        <article>
          <TopBar step={4} total={TOTAL_Q} lang={lang} setLang={setLang} />
          <Card>
            <Tag text={t.tag4} />
            <p className="text-lg font-black uppercase mb-4 leading-tight">{t.q4}</p>
            <div className="flex flex-col gap-2">
              {opts.map(({ val, icon, key }) => (
                <Opt key={val} icon={icon} label={String(t[key])}
                  selected={answers.urgency === val}
                  onClick={() => setField('urgency', val)} />
              ))}
            </div>
          </Card>
          <Nav onBack={goBack} onNext={goNext} nextLabel={t.seeRec} nextDisabled={!answers.urgency} />
        </article>
      );
    }

    return null;
  };

  return (
    <section aria-label="Presale funnel" className="w-full max-w-[560px] mx-auto font-brutal">
      {renderQuestion()}
    </section>
  );
}
