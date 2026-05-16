import React from 'react';

const teamMembers = [
  {
    name: "Dr. Victor Garcia M.",
    role: "CEO",
    description: "Lone Star College Faculty · AI Task Force",
    image: "/VHGM  foto.jpg",
    color: "bg-brutal-cyan"
  },
  {
    name: "Ing. Hugo Garcia P.",
    role: "INNOVATION OFFICER",
    description: "AI & Automation Specialist",
    image: "/Foto profesional Hugo Gerardo.png",
    color: "bg-brutal-yellow"
  },
  {
    name: "Mayela Garcia P.",
    role: "SOCIAL MEDIA EXPERT",
    description: "Digital Strategy & Educational Content",
    image: "/Foto profesional Mayela.png",
    color: "bg-brutal-pink"
  },
  {
    name: "Victor Garcia R.",
    role: "STORYTELLING & SEO",
    description: "Content & Digital Positioning Expert",
    image: "/foto Victor Andres.png",
    color: "bg-brutal-violet"
  }
];

export const Team = () => {
  return (
    <section id="team" className="bg-black py-24 px-6 border-b-4 border-black text-white relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <p className="text-brutal-cyan font-black uppercase tracking-[0.3em] mb-4 text-sm">Our Team</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none">
            The Specialists Behind <span className="text-brutal-yellow italic">48 Hours Studio</span>
          </h2>
          <p className="text-xl font-bold max-w-2xl mx-auto opacity-70">
            A multidisciplinary team with academic, technological, and strategic expertise in the digital sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="brutal-card bg-[#111] border-4 border-white p-8 flex flex-col items-center group hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
            >
              <div className="relative mb-8">
                {/* Glow Effect */}
                <div className={`absolute inset-0 ${member.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className={`relative w-40 h-40 border-4 border-black rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] ${member.color}`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl font-black uppercase mb-2 text-center group-hover:text-brutal-yellow transition-colors">
                {member.name}
              </h3>
              
              <div className={`inline-block px-4 py-1 border-2 border-white mb-6 text-xs font-black uppercase tracking-widest ${member.color} text-black`}>
                {member.role}
              </div>
              
              <p className="text-sm font-bold text-center opacity-60 leading-snug">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
