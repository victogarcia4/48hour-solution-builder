// Route: /presale
// Branch: feature/funnel-segmentation — DO NOT merge to main without review

import { PresaleFunnelContainer } from '@/features/funnel/components/presale/PresaleFunnelContainer';

export const metadata = {
  title: 'Get a recommendation — 48H Live',
  description: 'Answer 5 quick questions and receive a personalised plan for your project.',
};

export default function PresalePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <header className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">48H Live</p>
        <h1 className="text-2xl font-black uppercase">Find your plan</h1>
        <p className="text-sm text-gray-500 mt-1">5 questions · less than 2 minutes</p>
      </header>

      <PresaleFunnelContainer />
    </main>
  );
}
