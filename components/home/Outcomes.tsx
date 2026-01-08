import React from 'react';

interface OutcomeRow {
  area: string;
  target: string;
  alignment: string;
}

const OUTCOMES_DATA: OutcomeRow[] = [
  {
    area: "Investment Mobilization",
    target: "Facilitate ₹500 Crore in committed capital (VC, Bank debt, Corporate VC) for at least 75 startups operating in 'Deep-Tech' and 'National Priority' sectors (e.g., Green Hydrogen, AI for Bharat, Semi-conductors).",
    alignment: "Aatmanirbhar Bharat / Economic Growth: Directing capital to strategic sectors, reducing dependence on foreign technology."
  },
  {
    area: "Tier-2 Cities",
    target: "Facilitate the establishment of 10 new Mentorship/Incubation satellite nodes in Tier-2/3 cities, initiated through partnerships formed between metropolitan incubators/academia (met at QUC) and local institutions. Have 25% of these deep-tech startups and MSMEs established in Tier-2 cities and help at least 10 incubation centres in Tier-2 cities.",
    alignment: "Aligned with GoK's startup policy 2025: Inclusive Growth and Decentralization of Innovation. Spurring the innovation ecosystem in Tier-2 cities and encourage the talent and capital to stay in Tier-2 cities."
  },
  {
    area: "Intellectual Property",
    target: "Have at least 1000 high quality patent applications filed by these 'Deep-Tech' and have 30% of these 1000 as standard essential patents (SEPs).",
    alignment: "Global Leadership/R&D Strengthening: Building India's technological and intellectual asset base, moving up the Global Innovation Index (GII). SEP numbers contributing to the goals listed in NTP 2025."
  },
  {
    area: "Regulatory Impact",
    target: "Secure the adoption of at least 3 Policy/Regulatory Recommendations (e.g., tax incentives, easing compliance for a specific high-tech sector, government procurement) submitted by the QUC founder-policy panel.",
    alignment: "Ease of Doing Business: Streamlining the ecosystem, fostering a competitive and innovation-friendly environment."
  },
  {
    area: "Employment Generation",
    target: "Document the Creation of 5,000 High-Skilled Jobs reported by startups who received funding or deep-mentorship through the QUC platform.",
    alignment: "Demographic Dividend / Skill India: Translating innovation into high-value employment for the young workforce."
  }
];

export const Outcomes = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
            Measurable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Outcomes</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Target Horizon: Jan 2029 — 12 QUC Cycles</p>
        </div>

        <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gradient-to-r from-purple-900/40 via-zinc-900/40 to-pink-900/40 border-b border-white/10">
                  <th className="p-8 text-xs font-black uppercase tracking-[0.2em] text-purple-400 w-1/5">Outcome Area</th>
                  <th className="p-8 text-xs font-black uppercase tracking-[0.2em] text-purple-400 w-2/5">Measurable Target</th>
                  <th className="p-8 text-xs font-black uppercase tracking-[0.2em] text-purple-400 w-2/5">National Interest Alignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {OUTCOMES_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-8 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-white font-black uppercase tracking-tighter text-xl leading-tight group-hover:text-purple-400 transition-colors">
                          {row.area}
                        </span>
                      </div>
                    </td>
                    <td className="p-8 align-top">
                      <p className="text-zinc-200 text-lg leading-relaxed font-medium">
                        {row.target}
                      </p>
                    </td>
                    <td className="p-8 align-top">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 group-hover:border-pink-500/20 transition-all">
                        <p className="text-zinc-300 text-base leading-relaxed italic">
                          {row.alignment}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest italic">
            * All targets are projected based on QUC strategic integration models.
          </p>
        </div>
      </div>
    </section>
  );
};
