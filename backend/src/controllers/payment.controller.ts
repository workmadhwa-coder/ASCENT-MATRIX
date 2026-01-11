import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { getRegistrationById } from '../services/storage';
import { CreditCard, Award } from '../components/Icons';
import { RegistrationData } from '../types';

const { useLocation, useNavigate } = ReactRouterDOM as any;

// Global declaration for Razorpay script
declare const Razorpay: any;

/**
 * ✅ API CONFIGURATION
 * On Render, VITE_API_BASE_URL must be set in the Frontend Environment variables
 * and requires a "Clear Cache & Redeploy" to take effect.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PaymentPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registrationId = location.state?.registrationId;

  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // 1. Check if the API URL is missing and log it for debugging
    if (!API_BASE_URL) {
      console.error("❌ CRITICAL: VITE_API_BASE_URL is undefined. Check Render Environment Variables.");
    }

    if (!registrationId) {
      navigate('/register');
      return;
    }
    loadRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId]);

  const loadRegistration = async () => {
    try {
      const data = await getRegistrationById(registrationId);
      if (!data) {
        navigate('/register');
        return;
      }
      setRegistration(data);
    } catch (err) {
      console.error("Error loading registration:", err);
      navigate('/register');
    }
  };

  const handlePayNow = async () => {
    if (!registration || isInitializing) return;

    // Safety check before calling fetch
    if (!API_BASE_URL) {
      alert("Configuration Error: API URL not found. Please contact support.");
      return;
    }

    setIsInitializing(true);

    try {
      console.log(`📡 Attempting to contact: ${API_BASE_URL}/api/payment/create-order`);

      const response = await fetch(
        `${API_BASE_URL}/api/payment/create-order`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            amount: registration.totalAmount,
            registrationId: registration.id
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const orderData = await response.json();

      if (!orderData?.id) {
        throw new Error('Invalid order response from backend: Missing Order ID');
      }

      const options = {
        key: orderData.key_id, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ascent Matrix 2026',
        description: 'Official Delegate Pass',
        order_id: orderData.id,
        handler: function (response: any) {
          console.log("✅ Payment Successful:", response);
          navigate('/confirm', {
            state: {
              registrationId: registration.id,
              razorpayResponse: response
            }
          });
        },
        prefill: {
          name: registration.fullName,
          email: registration.email,
          contact: registration.phone
        },
        theme: { color: '#7c3aed' },
        modal: {
          ondismiss: function () {
            console.log("⚠️ Payment Modal Dismissed");
            navigate('/fail', {
              state: {
                registrationId: registration.id,
                orderId: orderData.id
              }
            });
          }
        }
      };

      const rzp = new Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
          console.error("❌ Razorpay Payment Failed:", response.error);
      });

      rzp.open();

    } catch (err: any) {
      console.error('❌ Payment Gateway Error:', err);
      alert(
        `Payment service unavailable. Details: ${err.message || 'Check connection'}`
      );
    } finally {
      setIsInitializing(false);
    }
  };

  if (!registration) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl relative">

        {/* Loading Overlay */}
        {isInitializing && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white font-black uppercase tracking-widest text-[10px]">
              Preparing Secure Gateway...
            </p>
          </div>
        )}

        <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>

        <div className="p-12">
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
            Confirm Pass
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-10 italic">
            Official Gateway Integration
          </p>

          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 mb-10 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                Delegate Name
              </span>
              <span className="text-white font-bold text-sm">
                {registration.fullName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                Payable Amount
              </span>
              <span className="text-3xl font-black text-white italic tracking-tighter">
                ₹{registration.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mb-8 p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed">
              Secure SSL Encrypted Payment. Your data is protected by Razorpay.
            </p>
          </div>

          <button
            onClick={handlePayNow}
            disabled={isInitializing}
            className="w-full py-5 rounded-3xl font-black text-lg bg-white text-black uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-6 h-6" />
            {isInitializing ? 'Connecting...' : 'Pay with Razorpay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
