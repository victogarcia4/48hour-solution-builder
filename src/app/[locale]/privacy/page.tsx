import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — 48H Live',
  description: 'Privacy Policy for 48H Live digital marketing and web development services.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b-4 border-black px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="bg-black text-white px-4 py-2 font-black text-xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase">
            48H LIVE
          </Link>
          <Link href="/" className="font-black uppercase text-sm hover:underline decoration-4 underline-offset-4">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="border-4 border-black bg-brutal-yellow p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
            Privacy<br />Policy
          </h1>
          <p className="font-bold uppercase tracking-widest text-sm">
            Last updated: June 2026 · 48H Live
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-black">

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">1. Who We Are</h2>
            <p className="font-medium leading-relaxed">
              48H Live ("Company," "we," "us," or "our") is a digital marketing and web development agency
              operating at <strong>48hours.live</strong>. We provide services including landing page design,
              e-commerce development, web applications, UGC content creation, and AI process consulting
              (ConsultorIA). Our primary contact is <strong>hello@48hours.live</strong>.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">2. Information We Collect</h2>
            <div className="space-y-4 font-medium leading-relaxed">
              <p><strong className="font-black">Information you provide directly:</strong></p>
              <ul className="list-none space-y-2 ml-4">
                {[
                  'Name and email address (contact forms, funnel)',
                  'Company name and business description',
                  'Project details and requirements you submit',
                  'Payment information (processed by third-party providers — we do not store card data)',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-black">→</span> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4"><strong className="font-black">Information collected automatically:</strong></p>
              <ul className="list-none space-y-2 ml-4">
                {[
                  'IP address and browser type',
                  'Pages visited and time spent on the site',
                  'Referring URLs',
                  'Device and operating system information',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-black">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">3. How We Use Your Information</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'To respond to your inquiries and deliver the services you request',
                'To send you project updates, quotes, and onboarding communications',
                'To send transactional emails related to your purchase or consultation',
                'To improve our website, services, and user experience',
                'To comply with legal obligations',
                'To send occasional marketing emails (only with your consent — you may unsubscribe at any time)',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">4. Sharing Your Information</h2>
            <p className="font-medium leading-relaxed mb-4">
              We do not sell, rent, or trade your personal information. We may share your data only with:
            </p>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Service providers that help us operate our business (e.g., Resend for email delivery, Supabase for data storage, Vercel for hosting)',
                'Payment processors to complete transactions securely',
                'Analytics tools to understand website usage (data is anonymized where possible)',
                'Legal authorities if required by law or to protect our rights',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">5. Cookies</h2>
            <p className="font-medium leading-relaxed">
              We use essential cookies to make our website function properly and analytics cookies
              to understand how visitors interact with our site. You can disable cookies in your browser
              settings at any time, though this may affect some functionality. We do not use
              advertising or tracking cookies from third-party ad networks.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">6. Data Retention</h2>
            <p className="font-medium leading-relaxed">
              We retain your personal data for as long as necessary to fulfill the purposes described
              in this policy, or as required by law. Contact form submissions and project inquiries
              are retained for up to 2 years. You may request deletion of your data at any time by
              emailing <strong>hello@48hours.live</strong>.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">7. Your Rights</h2>
            <p className="font-medium leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your data ("right to be forgotten")',
                'Opt out of marketing communications at any time',
                'Data portability — receive your data in a common format',
                'Lodge a complaint with your local data protection authority',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black">✓</span> {item}
                </li>
              ))}
            </ul>
            <p className="font-medium leading-relaxed mt-4">
              To exercise any of these rights, contact us at <strong>hello@48hours.live</strong>.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">8. Security</h2>
            <p className="font-medium leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal
              data against unauthorized access, alteration, disclosure, or destruction. All data
              transmission is encrypted via HTTPS/TLS. However, no method of internet transmission
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">9. Children's Privacy</h2>
            <p className="font-medium leading-relaxed">
              Our services are not directed to children under 13 years of age. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected such information, please contact us immediately at <strong>hello@48hours.live</strong>.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">10. Changes to This Policy</h2>
            <p className="font-medium leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by updating the "Last updated" date at the top of this page and, where
              appropriate, by sending you an email notification.
            </p>
          </section>

          <section className="border-4 border-black bg-black text-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-white pb-3">Contact</h2>
            <p className="font-medium leading-relaxed">
              For any privacy-related questions or requests, contact us at:<br />
              <strong className="text-brutal-yellow">hello@48hours.live</strong><br />
              48H Live · 48hours.live
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 px-8 border-t-4 border-black mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-black text-2xl tracking-tighter uppercase">48H LIVE</span>
          <div className="flex gap-8 font-black uppercase text-sm">
            <Link href="/privacy" className="hover:text-brutal-pink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brutal-pink transition-colors">Terms</Link>
            <a href="mailto:hello@48hours.live" className="hover:text-brutal-pink transition-colors normal-case">hello@48hours.live</a>
          </div>
          <p className="text-xs font-bold uppercase tracking-tighter opacity-60">© 2026 48H Live. Built with speed.</p>
        </div>
      </footer>
    </main>
  );
}
