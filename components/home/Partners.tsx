import React from 'react';
import { FACILITATORS, BANKERS } from '../../constants';

const SponsorCard = ({ tier, logo, color = "bg-pink-600" }: { tier: string, logo: string, color?: string }) => (
  <div className="rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 border border-zinc-800 group">
    <div className={`${color} text-white text-center py-2 font-bold uppercase text-xs tracking-wider`}>
      {tier}
    </div>
    <div className="bg-zinc-900 p-4 flex items-center justify-center h-28 relative group-hover:bg-zinc-800 transition-colors">
      <img src={logo} alt={tier} className="max-h-16 max-w-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300" />
    </div>
  </div>
);

export const Partners = () => {
  return (
    <>
      <section className="py-24 px-4 border-t border-zinc-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                     <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest text-center md:text-left border-l-4 border-purple-500 pl-4">Facilitators</h3>
                     <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        {FACILITATORS.map(f => (
                            <div key={f.name} className="bg-white rounded-lg h-24 w-48 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                                <span className="text-black font-extrabold text-2xl uppercase tracking-tighter">{f.name}</span>
                            </div>
                        ))}
                     </div>
                </div>
                <div>
                     <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest text-center md:text-left border-l-4 border-pink-500 pl-4">Banking Partners</h3>
                     <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {BANKERS.map(b => (
                            <span key={b} className="bg-zinc-800 px-5 py-2 rounded-full text-gray-300 text-sm font-bold border border-zinc-700 hover:border-pink-500 hover:text-white hover:bg-zinc-700 transition-all cursor-default">
                                {b}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">Global Sponsors</h2>
                <div className="w-24 h-1.5 bg-zinc-800 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <SponsorCard tier="Platinum Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" color="bg-pink-600" />
                <SponsorCard tier="AI Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" color="bg-pink-500" />
                <SponsorCard tier="Biotech Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" color="bg-pink-600" />
                <SponsorCard tier="Diamond Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" color="bg-purple-600" />
                <SponsorCard tier="Diamond Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" color="bg-purple-600" />
                <SponsorCard tier="Diamond Sponsor" logo="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" color="bg-purple-600" />
            </div>
        </div>
      </section>
    </>
  );
};