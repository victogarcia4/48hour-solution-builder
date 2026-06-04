import { useTranslations } from 'next-intl';
import { Hero } from "@/shared/components/hero";
import { Problem } from "@/shared/components/problem";
import { Promise } from "@/shared/components/promise";
import { Comparison } from "@/shared/components/comparison";
import { WhyPossible } from "@/shared/components/why-possible";
import { Team } from "@/shared/components/team";
import { Pricing } from "@/shared/components/pricing";
import { Partners } from "@/shared/components/partners";
import { FAQ } from "@/shared/components/faq";
import { Contact } from "@/shared/components/contact";
import { LanguageToggle } from "@/shared/components/language-toggle";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-white selection:bg-brutal-pink selection:text-white">
      {/* Navbar */}
      <nav className="bg-white border-b-4 border-black px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="bg-black text-white px-4 py-2 font-black text-xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-default transition-all uppercase">
            {t('navbar.logo')}
          </span>
          <div className="hidden md:flex items-center gap-8 font-black uppercase text-sm">
            <a href="#how-it-works" className="hover:underline decoration-4 underline-offset-4">{t('navbar.howItWorks')}</a>
            <a href="#team" className="hover:underline decoration-4 underline-offset-4">{t('navbar.team')}</a>
            <a href="#pricing" className="hover:underline decoration-4 underline-offset-4">{t('navbar.pricing')}</a>
            <a href="#faq" className="hover:underline decoration-4 underline-offset-4">{t('navbar.faq')}</a>
            <a href="/consultoria" className="hover:underline decoration-4 underline-offset-4 text-black">Consultor<span className="text-purple-600 text-[1.25em] ml-0.5 inline-block">IA</span></a>
            <LanguageToggle />
            <a href="#funnel" className="brutal-btn bg-brutal-yellow py-2 px-6 text-xs">
              {t('navbar.cta')}
            </a>
          </div>
        </div>
      </nav>

      <Hero />
      <Problem />
      <Promise />

      {/* Funnel CTA Section */}
      <section id="funnel" className="py-24 px-6 bg-brutal-violet border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              {t('funnelSection.title')} <span className="bg-white text-black px-2 -rotate-1 inline-block">{t('funnelSection.titleHighlight')}</span> {t('funnelSection.titleEnd')}
            </h2>
            <p className="text-xl font-bold text-white uppercase tracking-widest">
              {t('funnelSection.subtitle')}
            </p>
          </div>
          <div className="brutal-card bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center space-y-8">
              <p className="text-2xl font-black uppercase text-black">
                {t('funnelSection.mainText')}
              </p>
              <p className="text-lg text-gray-600">
                {t('funnelSection.subText')}
              </p>
              <a
                href="/presale"
                className="brutal-btn bg-brutal-yellow text-black text-2xl px-12 py-6 hover:shadow-none transition-all inline-block font-black uppercase"
              >
                {t('funnelSection.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="how-it-works">
        <WhyPossible />
      </div>
      <Team />
      <Comparison />
      <Pricing />
      <Partners />
      <FAQ />
      <Contact />

      {/* Final CTA Section */}
      <section className="bg-brutal-pink py-24 px-6 border-b-4 border-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-12">
            {t('finalCta.title')} <span className="bg-black text-white px-4 -rotate-2 inline-block">{t('finalCta.titleHighlight')}</span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-12 uppercase tracking-tight">
            {t('finalCta.description')}
          </p>
          <a href="#funnel" className="brutal-btn bg-black text-white text-2xl px-12 py-6 hover:bg-white hover:text-black transition-all inline-block">
            {t('finalCta.cta')}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-8 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-black text-3xl tracking-tighter uppercase">{t('footer.logo')}</span>
            <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{t('footer.tagline')}</p>
          </div>
          <div className="flex flex-wrap gap-8 font-black uppercase text-sm">
            <a href="#" className="hover:text-brutal-pink transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-brutal-pink transition-colors">{t('footer.terms')}</a>
            <a href="#contact" className="hover:text-brutal-pink transition-colors">{t('footer.contact')}</a>
            <a href="mailto:info@48hours.live" className="hover:text-brutal-pink transition-colors normal-case">{t('footer.email')}</a>
          </div>
          <div className="font-bold text-xs uppercase tracking-tighter">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </main>
  );
}
