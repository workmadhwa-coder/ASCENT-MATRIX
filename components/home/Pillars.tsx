import React from 'react';

const StakeholderDonut = () => {
  const stakeholders = [
    "Academia",
    "Policy Makers",
    "Founders",
    "Investors",
    "Mentors",
    "Industry",
    "Incubators & Accelerators",
    "Banks",
    "Law Firms"
  ];

  const size = 500;
  const center = size / 2;
  const outerRadius = 220;
  const innerRadius = 110;
  const segmentCount = stakeholders.length;
  const angleStep = 360 / segmentCount;

  return (
    <div className="relative w-full max-w-2xl mx-auto py-10 group">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto drop-shadow-[0_0_50px_rgba(124,58,237,0.2)]">
        <defs>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>

        {/* Outer Ring Background (White to contrast labels) */}
        <circle cx={center} cy={center} r={outerRadius} className="fill-white" />

        {/* Segments Dividers (Brand Purple) */}
        {stakeholders.map((_, i) => {
          const angle = (angleStep * i - 90) * (Math.PI / 180);
          const x2 = center + outerRadius * Math.cos(angle);
          const y2 = center + outerRadius * Math.sin(angle);
          return (
            <line 
              key={`line-${i}`}
              x1={center} y1={center} x2={x2} y2={y2} 
              stroke="#7c3aed" 
              strokeWidth="2" 
              className="opacity-40"
            />
          );
        })}

        {/* Stakeholder Labels (Inside Segments) */}
        {stakeholders.map((name, i) => {
          const midAngle = (angleStep * i + angleStep / 2 - 90) * (Math.PI / 180);
          const textRadius = (innerRadius + outerRadius) / 2;
          const x = center + textRadius * Math.cos(midAngle);
          const y = center + textRadius * Math.sin(midAngle);
          
          const words = name.split(' ');
          
          return (
            <text 
              key={`text-${i}`}
              x={x} 
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-zinc-900 font-bold text-[13px] uppercase tracking-tighter pointer-events-none"
            >
              {words.map((word, wi) => (
                <tspan 
                  key={wi} 
                  x={x} 
                  dy={wi === 0 ? (words.length > 1 ? "-0.4em" : "0") : "1.2em"}
                >
                  {word}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Central Core (Brand Gradient) */}
        <circle 
          cx={center} cy={center} r={innerRadius} 
          fill="url(#centerGradient)"
          className="transition-all duration-500 hover:brightness-110" 
        />
        <text 
          x={center} y={center - 10} 
          textAnchor="middle" 
          className="fill-white font-black text-2xl uppercase tracking-widest pointer-events-none italic"
        >
          INNOVATION
        </text>
        <text 
          x={center} y={center + 25} 
          textAnchor="middle" 
          className="fill-white font-black text-2xl uppercase tracking-widest pointer-events-none italic"
        >
          ECOSYSTEM
        </text>

        {/* Outer Border (Brand Purple) */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#7c3aed" strokeWidth="3" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
      </svg>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-purple-500/15 transition-all duration-700"></div>
    </div>
  );
};

export const Pillars = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-900/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <StakeholderDonut />
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                  The Pillars of Ascent Matrix
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Historically, the diverse pillars of the innovation landscape—from policy to capital, and from research to market—have operated in isolation or if at all they have operated together, they have operated in small pockets in a limited manner.
              </p>
              <p className="text-white font-bold text-xl italic">
                'Ascent Matrix' attempts to solve this gap by physically and strategically uniting every key stakeholder under one roof. starting with this grand inauguration in Bengaluru, the nucleus of Indian innovation.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-fuchsia-400 font-bold uppercase tracking-wide">
                <li>• Policy Makers</li>
                <li>• Founders</li>
                <li>• Investors</li>
                <li>• Mentors</li>
                <li>• Banks</li>
                <li>• Industry</li>
                <li>• Academia</li>
                <li>• Law Firms</li>
                <li>• Incubators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};