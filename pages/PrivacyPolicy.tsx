
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-2xl">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Privacy Policy</h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-12 italic">Last Updated: October 2025</p>
        
        <div className="space-y-10 text-zinc-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">1. Data Collection</h2>
            <p>Ascent Matrix 2026 collects personal information during registration to facilitate conference access, communication, and security. This includes your name, email, organization, and professional role.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">2. Use of Information</h2>
            <p>Your data is used to generate digital passes, provide event updates, and analyze attendee demographics for ecosystem improvement. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">3. Security</h2>
            <p>We implement industry-standard encryption and security protocols to protect your data stored in our cloud infrastructure. Access is restricted to authorized administrative personnel.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">4. Digital Footprint</h2>
            <p>Photographs and videos taken during the summit may be used for future promotional materials. By attending, you consent to being featured in such media.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
