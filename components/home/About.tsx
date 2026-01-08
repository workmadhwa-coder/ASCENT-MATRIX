import React from 'react';
import { TrendingUp } from '../Icons';

export const About = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                  What is Ascent Matrix?
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="font-semibold text-white">
                The 'Ascent Matrix' Innovation Ecosystem Connect is a pioneering initiative to dismantle silos and forge a seamless, collaborative engine for innovation.
              </p>
              <p>
                Directly aligned with India's national vision of <span className="text-purple-400 font-bold">'Viksit Bharat' (Developed India) by 2047</span> and the goal of <span className="text-pink-400 font-bold">'Aatmanirbhar Bharat' (Self-Reliant India)</span>, Ascent Matrix aims to <span className="text-white font-bold italic">“Amplify Innovation and IP generation efforts of India’s Deep-Tech Start-ups”</span>.
              </p>
              <p>
                Our unique value proposition (UVP) is the establishment of a <span className="text-fuchsia-400 font-bold">Quarterly Unified Connect (QUC) cycle</span>, which transcends a typical one-off event. This inaugural summit will launch the first QUC, a recurring platform for structured Pitching and Mentoring Sessions, ensuring continuous, high-impact collaboration and measurable progress to amplify the innovation and IP generation efforts of the Indian deep-tech start-ups.
              </p>
            </div>
          </div>
          
          <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-inner">
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <TrendingUp className="text-fuchsia-500" />
              Mechanics of QUC
            </h3>
            <div className="space-y-8">
              {[
                { title: "Unified Assembly", desc: "Every key stakeholder meets quarterly to ensure alignment and momentum." },
                { title: "Structured Pitching", desc: "Shortlisted startups pitch to a panel of Investors, Banks, and Sector-Specific Policy Makers for funding and regulatory guidance." },
                { title: "High-Impact Mentoring", desc: "Dedicated sessions matching Founders with Industry Leaders, Legal/IP Experts, and Academicians for technical, commercial, and IP strategy." },
                { title: "Feedback Loop", desc: "Policy makers receive direct, real-time feedback from the ground to inform subsequent regulatory changes." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600/20 flex items-center justify-center text-fuchsia-500 font-bold group-hover:bg-fuchsia-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-lg mb-1">{item.title}</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};