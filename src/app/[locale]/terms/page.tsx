import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — 48H Live',
  description: 'Terms of Service for 48H Live digital marketing and web development services.',
};

export default function TermsPage() {
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
        <div className="border-4 border-black bg-black text-white p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
            Terms of<br />Service
          </h1>
          <p className="font-bold uppercase tracking-widest text-sm text-gray-400">
            Last updated: June 2026 · 48H Live
          </p>
        </div>

        {/* Intro */}
        <div className="border-4 border-black bg-brutal-yellow p-6 mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold leading-relaxed">
            By accessing our website or purchasing any service from 48H Live, you agree to be bound
            by these Terms of Service. Please read them carefully before placing an order or submitting
            a project request. If you do not agree, do not use our services.
          </p>
        </div>

        <div className="space-y-10 text-black">

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">1. Services</h2>
            <p className="font-medium leading-relaxed mb-4">
              48H Live provides digital marketing and web development services, including but not limited to:
            </p>
            <ul className="list-none space-y-2 font-medium leading-relaxed">
              {[
                'Starter Landing — single-page website design and development',
                'Online Store — e-commerce website design and development',
                'Platform Lite — custom web application and business tools',
                'ConsultorIA — AI process audit and strategic roadmap (delivered within 48 hours)',
                'UGC Content Creation — branded photo and video content for social media and advertising',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="font-medium leading-relaxed mt-4">
              All service scopes, deliverables, and timelines are confirmed in writing before work begins.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">2. Payment Terms</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Payment is required in full before work begins, unless otherwise agreed in writing.',
                'Prices are listed in USD. All transactions are final unless otherwise stated.',
                'We accept payment via the methods listed on our website at the time of purchase.',
                'Failure to complete payment voids the service agreement and we reserve the right to suspend delivery.',
                'For projects over $1,000, a payment schedule (e.g., 50% upfront / 50% on delivery) may be offered at our discretion.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">3. Revisions & Scope</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Each service package includes the number of revisions specified at the time of purchase (typically 2).',
                'A revision is defined as a reasonable adjustment within the original agreed scope.',
                'Requests that significantly change the scope, add new features, or require substantial redesign will be quoted separately.',
                'Revision requests must be submitted within 7 calendar days of delivery. After this window, the project is considered accepted.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">4. Delivery & Timelines</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Estimated delivery timelines are communicated at the start of each project.',
                'The 48-hour delivery guarantee for ConsultorIA begins after your onboarding session is completed.',
                'Delays caused by the client (e.g., late content submission, delayed feedback, or lack of communication) will extend the delivery timeline accordingly.',
                'We are not liable for delays caused by third-party services (hosting providers, payment processors, domain registrars, etc.).',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">5. Client Responsibilities</h2>
            <p className="font-medium leading-relaxed mb-4">The client agrees to:</p>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Provide accurate and complete project information, branding assets, and content in a timely manner.',
                'Respond to communications within 3 business days to avoid project delays.',
                'Ensure they have the rights to all content, images, and materials they provide.',
                'Not use the delivered work for illegal, defamatory, or harmful purposes.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">6. Intellectual Property</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Upon receipt of full payment, the client owns the final deliverables produced specifically for their project.',
                'We retain the right to display the work in our portfolio and marketing materials unless the client requests otherwise in writing.',
                'We retain ownership of all proprietary tools, frameworks, templates, and internal processes used to build the deliverable.',
                'Third-party assets (stock photos, fonts, plugins, open-source libraries) are subject to their respective licenses.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">7. Refund Policy</h2>
            <ul className="list-none space-y-3 font-medium leading-relaxed">
              {[
                'Refunds are not available once work has begun, as our services involve immediate allocation of time and resources.',
                'If we are unable to deliver the agreed service due to our own fault, we will offer a full refund or project credit.',
                'ConsultorIA audits are non-refundable once the onboarding session has taken place.',
                'Disputes must be raised within 7 days of delivery by emailing hello@48hours.live.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">8. Limitation of Liability</h2>
            <p className="font-medium leading-relaxed">
              48H Live's total liability for any claim arising from our services shall not exceed the
              total amount paid by the client for the specific service in question. We are not liable
              for indirect, incidental, or consequential damages including loss of revenue, loss of
              data, or business interruption — even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">9. Confidentiality</h2>
            <p className="font-medium leading-relaxed">
              Both parties agree to keep confidential any proprietary or sensitive information shared
              during the project. We will not disclose your business strategy, data, or internal
              processes to third parties. This obligation survives the termination of the service agreement.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">10. Termination</h2>
            <p className="font-medium leading-relaxed">
              Either party may terminate the service agreement with written notice if the other party
              materially breaches these terms and fails to remedy the breach within 5 business days.
              Upon termination, the client will be billed for work completed up to the termination date,
              and all deliverables produced to that point will be provided.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">11. Governing Law</h2>
            <p className="font-medium leading-relaxed">
              These Terms of Service are governed by applicable law. Any disputes that cannot be
              resolved amicably will be subject to binding arbitration or the jurisdiction of the
              courts applicable to the registered location of 48H Live. Both parties agree to attempt
              good-faith resolution before pursuing legal action.
            </p>
          </section>

          <section className="border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">12. Changes to These Terms</h2>
            <p className="font-medium leading-relaxed">
              We reserve the right to update these Terms of Service at any time. Continued use of
              our services after changes are posted constitutes acceptance of the new terms.
              We will notify clients of material changes via email.
            </p>
          </section>

          <section className="border-4 border-black bg-black text-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-white pb-3">Contact</h2>
            <p className="font-medium leading-relaxed">
              For any questions regarding these Terms of Service, contact us at:<br />
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
