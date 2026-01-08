
import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-2xl">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Cancellation & Refund</h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-12 italic">Delegate Pass Policy</p>
        
        <div className="space-y-10 text-zinc-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">1. Cancellation Window</h2>
            <p>Requests for cancellation must be submitted via email to contact@ascentmatrix.com. Full refunds are processed only if requested within 7 days of the registration date.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">2. Processing Fee</h2>
            <p>A non-refundable administrative fee of ₹500 will be deducted from all eligible refunds to cover payment gateway and processing costs.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">3. Late Requests</h2>
            <p>Cancellations requested after the 7-day window or within 30 days of the event commencement are strictly non-refundable but can be transferred to another individual upon request.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">4. Force Majeure</h2>
            <p>In the event of cancellation by the organizers due to unforeseen circumstances, registrations will be automatically carried forward to the rescheduled date. Refund options will be provided at that time.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
