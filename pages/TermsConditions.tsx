
import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-2xl">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Terms & Conditions</h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-12 italic">Official Guidelines for Attendees</p>
        
        <div className="space-y-10 text-zinc-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">1. Admission</h2>
            <p>Entry to Ascent Matrix 2026 is strictly by valid digital pass. Each pass is unique to the registrant and non-transferable without prior approval from the organizing committee.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">2. Conduct</h2>
            <p>Attendees are expected to maintain professional decorum. Harassment of any form will lead to immediate expulsion from the venue without refund.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">3. Intellectual Property</h2>
            <p>Session content, presentations, and branding remain the property of the speakers and organizers. Recording for commercial redistribution is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">4. Liability</h2>
            <p>The organizers are not responsible for personal loss or damage to belongings at the venue. Attendees participate at their own risk.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
