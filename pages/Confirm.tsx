import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { getRegistrationById } from '../services/storage';
import { CheckCircle } from '../components/Icons';
import { RegistrationData } from '../types';

const { useLocation, useNavigate } = ReactRouterDOM as any;

// Use VITE_ prefix for Vite projects
const BACKEND_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationId, razorpayResponse } = location.state || {};

  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showWave, setShowWave] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!registrationId || !razorpayResponse) {
      navigate('/register');
      return;
    }
    verifyAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAndLoad = async () => {
    try {
      setIsVerifying(true);

      // 1. VERIFY PAYMENT
      const verifyRes = await fetch(`${BACKEND_URL}/api/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...razorpayResponse,
          registrationId
        })
      });

      if (!verifyRes.ok) throw new Error('Payment verification API failed');

      const verifyData = await verifyRes.json();
      if (verifyData.status !== 'success') throw new Error('Payment verification failed');

      // 2. FETCH UPDATED REGISTRATION
      const reg = await getRegistrationById(registrationId);
      if (!reg) throw new Error('Registration not found');
      setRegistration(reg);

      // 3. GENERATE TICKET & SEND EMAIL
      await fetch(`${BACKEND_URL}/api/ticket/generate-and-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationData: reg,
          paymentId: razorpayResponse.razorpay_payment_id
        })
      });

      // 4. UI TIMINGS - Smooth transition for animation
      setTimeout(() => setShowWave(false), 1400);
      setTimeout(() => handleDownload(reg), 1800);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setTimeout(() => setIsVerifying(false), 1000);
    }
  };

  const handleDownload = async (regData: RegistrationData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/ticket/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationData: regData,
          paymentId: razorpayResponse.razorpay_payment_id
        })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Ascent_Matrix_Pass_${regData.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('PDF download failed', err);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Verifying Transaction</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <span className="text-4xl font-black">!</span>
        </div>
        <h2 className="text-3xl font-black text-red-500 uppercase italic mb-4">Verification Error</h2>
        <p className="text-zinc-500 mb-8 max-w-xs">{error}</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!registration) return null;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${registration.id}`;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {showWave && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="success-wave-inner"></div>
          <div className="success-wave-outer"></div>
          <CheckCircle className="w-20 h-20 text-white z-[101] animate-check-pop" />
        </div>
      )}

      {!showWave && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 animate-ticket-entrance">
          
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 text-center">
            You're In!
          </h2>

          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px] mb-12 text-center bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
            Pass generated and sent to {registration.email}
          </p>

          <div className="max-w-md w-full bg-white text-black p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-t-[12px] border-green-500 relative">
            {/* Ticket Punch Holes */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>

            <div className="flex justify-between items-start mb-8 border-b border-dashed border-zinc-200 pb-8">
              <div>
                <h1 className="text-xl font-black uppercase italic leading-none">Ascent Matrix</h1>
                <p className="text-green-600 font-black text-2xl italic tracking-tighter">2026</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-2">Official Delegate</p>
              </div>
              <img src={qrUrl} alt="QR" className="w-20 h-20 border p-1 rounded-lg" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Attendee</p>
                <p className="text-lg font-black uppercase italic">{registration.fullName}</p>
                <p className="text-zinc-500 font-bold text-xs">{registration.organization}</p>
              </div>

              <div className="pt-6 border-t border-zinc-100">
                <p className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Venue</p>
                <p className="font-bold text-xs uppercase">Chowdiah Memorial Hall</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">Vyalikaval, Malleshwaram, Bengaluru</p>
                <a
                  href="https://maps.google.com/?q=Chowdiah+Memorial+Hall"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 font-black text-[9px] uppercase tracking-widest mt-3 inline-block hover:underline"
                >
                  View on Map →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Wave Animations */
        .success-wave-inner {
          position: absolute;
          width: 100px;
          height: 100px;
          background: #22c55e;
          border-radius: 50%;
          animation: waveGrow 1.4s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }
        
        .success-wave-outer {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          animation: waveGrow 1.6s cubic-bezier(0.2, 0, 0.2, 1) 0.1s forwards;
        }

        @keyframes waveGrow {
          0% { transform: scale(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: scale(40); opacity: 0; }
        }

        .animate-check-pop {
          animation: checkPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-ticket-entrance {
          animation: ticketSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes ticketSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Confirm;
