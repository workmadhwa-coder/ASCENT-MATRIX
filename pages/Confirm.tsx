
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { getRegistrationById } from '../services/storage';
import { CheckCircle } from '../components/Icons';
import { RegistrationData } from '../types';

const { useLocation, useNavigate } = ReactRouterDOM as any;

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
  }, []);

  const verifyAndLoad = async () => {
    try {
      // Send both the signature details and the registration ID to the backend
      const verifyRes = await fetch('http://localhost:3000/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...razorpayResponse,
          registrationId
        })
      });

      const verifyData = await verifyRes.json();
      if (verifyData.status !== 'success') {
        throw new Error('Payment verification failed');
      }

      // Fetch the updated registration data (now marked as PAID)
      const reg = await getRegistrationById(registrationId);
      setRegistration(reg);

      // Trigger server-side ticket generation and email
      await fetch('http://localhost:3000/api/ticket/generate-and-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationData: reg,
          paymentId: razorpayResponse.razorpay_payment_id
        })
      });

      // Auto-download PDF
      setTimeout(() => handleDownload(reg), 1300);

      // Remove wave after animation
      setTimeout(() => setShowWave(false), 1400);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownload = async (regData = registration) => {
    if (!regData) return;
    try {
      const response = await fetch('http://localhost:3000/api/ticket/download', {
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
    } catch {
      console.error('PDF download failed');
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-black text-red-500 uppercase italic mb-4">
          Verification Error
        </h2>
        <p className="text-zinc-500 mb-8">{error}</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs"
        >
          Back to Registration
        </button>
      </div>
    );
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${registration?.id}`;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* 🔥 RADIAL SUCCESS WAVE (REFERENCE STYLE) */}
      {showWave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="success-wave"></div>
        </div>
      )}

      {!showWave && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 animate-fade-in">

          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-xl">
            <CheckCircle className="w-12 h-12" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-3 text-center">
            Registration Confirmed
          </h2>

          <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-10 text-center">
            Confirmation email sent to {registration?.email}
          </p>

          <div className="max-w-xl w-full bg-white text-black p-10 rounded-[2.5rem] shadow-2xl border-t-[12px] border-green-500">

            <div className="flex justify-between items-start mb-10 border-b pb-8">
              <div>
                <h1 className="text-2xl font-black uppercase italic">
                  Ascent Matrix 2026
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Official Delegate Pass
                </p>
              </div>
              <img src={qrUrl} alt="QR" className="w-24 h-24" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black uppercase text-zinc-400">
                  Delegate
                </p>
                <p className="text-xl font-black uppercase italic">
                  {registration?.fullName}
                </p>
                <p className="text-zinc-600 font-bold text-sm">
                  {registration?.organization}
                </p>
              </div>

              <div className="pt-6 border-t">
                <p className="text-[9px] font-black uppercase text-zinc-400">
                  Event Location
                </p>
                <p className="font-bold text-sm">
                  Chowdiah Memorial Hall
                </p>
                <p className="text-xs text-zinc-600">
                  16th Cross Rd, Vyalikaval, Malleshwaram, Bengaluru – 560003
                </p>
                <a
                  href="https://maps.google.com/?q=Chowdiah+Memorial+Hall"
                  target="_blank"
                  className="text-green-600 font-black text-xs uppercase tracking-widest mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🎬 ANIMATIONS */}
      <style>{`
        .success-wave {
          width: 120px;
          height: 120px;
          background: #22c55e;
          border-radius: 9999px;
          animation: successWave 1.2s ease-out forwards;
        }

        @keyframes successWave {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          70% {
            transform: scale(25);
            opacity: 1;
          }
          100% {
            transform: scale(30);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default Confirm;
