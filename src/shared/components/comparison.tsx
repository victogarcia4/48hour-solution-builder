import React from 'react';

export const Comparison = () => {
  const comparisonData = [
    { traditional: 'Long discovery meetings', studio: 'Guided funnel' },
    { traditional: 'Client must write everything', studio: 'AI-assisted copy' },
    { traditional: 'Manual proposal process', studio: 'Automatic plan recommendation' },
    { traditional: 'Weeks or months of waiting', studio: 'Less than 48 hours' },
    { traditional: 'Confusing technical language', studio: 'Simple choices' },
    { traditional: 'High agency pricing', studio: 'Affordable transparent pricing' },
    { traditional: 'Mockup or MVP first', studio: 'Finished product' },
  ];

  return (
    <section className="bg-brutal-orange py-24 px-6 border-b-4 border-black">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 text-center leading-none">
          The <span className="bg-white px-2">Old Way</span> vs. The <span className="bg-white px-2">Fast Way</span>
        </h2>
        
        <div className="overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white text-lg font-black uppercase">
                <th className="p-6 border-r-4 border-white w-1/2">Traditional Agency</th>
                <th className="p-6">48-Hour Funnel</th>
              </tr>
            </thead>
            <tbody className="font-bold uppercase text-sm">
              {comparisonData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-brutal-gray/20'}>
                  <td className="p-6 border-r-4 border-black border-b-4">
                    <span className="flex items-center gap-3">
                      <span className="text-red-500">✕</span> {row.traditional}
                    </span>
                  </td>
                  <td className="p-6 border-b-4 border-black bg-brutal-cyan/20">
                    <span className="flex items-center gap-3">
                      <span className="text-green-600">✓</span> {row.studio}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
