
import React, { useState } from 'react';
import { saveSponsorship } from '../services/storage';
import { SponsorshipInquiry } from '../types';

const Sponsorship = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    tier: 'Platinum',
    budget: '₹5L - ₹10L'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newInquiry: SponsorshipInquiry = {
      id: `SP-${Date.now()}`,
      ...formData,
      status: 'New',
      date: new Date().toISOString()
    };
    
    try {
      await saveSponsorship(newInquiry);
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed to sync with cloud. Check internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-12 rounded-3xl border border-zinc-800 text-center max-w-lg shadow-2xl animate-fade-in-up">
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">Request Received</h2>
          <p className="text-zinc-500 mb-10 font-bold">Your partnership inquiry has been synced to our cloud server. Our team will connect with you shortly.</p>
          <button onClick={() => setSubmitted(false)} className="bg-zinc-800 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase italic tracking-tighter">Partner <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Growth</span></h1>
              <p className="text-xl text-zinc-500 mb-10 leading-relaxed font-medium italic">Join the core engine of India's tech future. Get exclusive access to the policy makers and the deepest tech talent.</p>
              <div className="space-y-6">
                {["Brand Dominance", "Talent Funnel", "Policy Networking"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-black text-white italic">{idx + 1}</div>
                    <span className="text-white font-black uppercase italic tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
          </div>
          <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-8 uppercase italic">Sponsorship Desk</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                  <input type="text" required placeholder="Company" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="Contact Name" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none" />
                    <input type="tel" required placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none" />
                  </div>
                  <input type="email" required placeholder="Work Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <select value={formData.tier} onChange={(e) => setFormData({...formData, tier: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none uppercase font-black text-[10px] tracking-widest">
                        <option>Platinum</option><option>Gold</option><option>Silver</option>
                    </select>
                    <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none font-black text-[10px] tracking-widest">
                        <option>₹5L - ₹10L</option><option>₹10L - ₹25L</option><option>₹25L+</option>
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-5 rounded-2xl mt-4 transition-all uppercase tracking-widest shadow-xl">{isSubmitting ? 'Syncing...' : 'Request Proposal'}</button>
              </form>
          </div>
       </div>
    </div>
  );
};

export default Sponsorship;
