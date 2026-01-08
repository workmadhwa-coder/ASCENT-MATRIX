
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { X } from '../components/Icons';

const { useLocation, useNavigate } = ReactRouterDOM as any;

declare const Razorpay: any;

const Fail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationId, orderId } = location.state || {};

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!orderId || isRetrying) return;
    setIsRetrying(true);

    try {
      // In a real scenario, you'd fetch the registration details again or use the existing ones
      // We'll assume we have the key_id from a constants file or similar. For simplicity, we hardcode test key.
      const options = {
        key: "rzp_test_Ry9JJCHZpNli0", // Use your Key ID
        amount: 200000, // Should be dynamic
        currency: "INR",
        name: "Ascent Matrix 2026",
        order_id: orderId,
        handler: function (response: any) {
          navigate('/confirm', { state: { registrationId, razorpayResponse: response } });
        },
        theme: { color: "#7c3aed" }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Retry failed. Contact support.");
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-8 border border-red-500/30">
        <X className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Payment Incomplete</h1>
      <p className="text-zinc-500 max-w-md mx-auto mb-12 font-medium tracking-tight">The transaction was interrupted or declined. You can retry the payment using the same session.</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleRetry} 
          disabled={isRetrying}
          className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl"
        >
          {isRetrying ? 'Launching Gateway...' : 'Retry Payment'}
        </button>
        <button onClick={() => navigate('/register')} className="border-2 border-zinc-800 text-zinc-500 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-white transition-all">Cancel</button>
      </div>
    </div>
  );
};

export default Fail;
