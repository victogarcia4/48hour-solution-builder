import React from 'react';

export const WhyPossible = () => {
  const reasons = [
    {
      title: 'Guided Funnel',
      desc: 'No long discovery meetings. Your answers define the scope instantly.',
      icon: '🎯'
    },
    {
      title: 'AI-Assisted Copy',
      desc: 'We use AI to draft high-conversion copy based on your business industry.',
      icon: '🤖'
    },
    {
      title: 'Design Patterns',
      desc: 'Proven neobrutalist and modern layouts that work out of the box.',
      icon: '📐'
    },
    {
      title: 'Lean Dev Workflow',
      desc: 'No manual handoffs. Our internal systems are built for pure speed.',
      icon: '⚡'
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 leading-none">
            48 HOURS IS POSSIBLE BECAUSE WE <br />
            <span className="bg-brutal-yellow px-2">REMOVED THE FRICTION</span>
          </h2>
          <p className="text-xl font-bold max-w-3xl mx-auto opacity-80">
            Traditional agencies take weeks because they start with manual processes for every project. This system uses automation and lean workflows to produce finished products faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="brutal-card bg-white hover:bg-brutal-cyan transition-colors group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{reason.icon}</div>
              <h3 className="text-2xl font-black uppercase mb-4">{reason.title}</h3>
              <p className="font-bold opacity-80 leading-snug">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
