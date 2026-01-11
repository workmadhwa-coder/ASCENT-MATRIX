import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { getRegistrationById } from '../services/storage';
import { RegistrationData } from '../types';

const { useLocation, useNavigate } = ReactRouterDOM as any;

declare const Razorpay: any;

// ✅ MUST MATCH Render ENV NAME
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PaymentPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const registrationId = location.state?.registrationId;

  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // Load registration
  // =========================
  useEffect(() => {
    if (!registrationId) {
      setError('Invalid registration');
      return;
    }

    const loadData = async () => {
      try {
        const data = await getRegistrationById(registrationId);
        setRegistration(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load registration');
      }
    };

    loadData();
  }, [registrationId]);

  // =========================
  // Start Payment
  // =========================
  const startPayment = async () => {
    if (!registration) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payment/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: registration.totalAmount,
            registrationId: registration.id
          })
        }
      );

      // 🚨 Handle non-JSON (404 HTML)
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'Payment service unavailable');
      }

      const order = JSON.parse(text);

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Ascent Matrix',
        description: 'Registration Fee',
        order_id: order.id,
        handler: async (resp: any) => {
          await verifyPayment(resp);
        },
        prefill: {
          name: registration.delegateName,
          email: registration.email,
          contact: registration.phone
        },
        theme: {
          color: '#7c3aed'
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Verify Payment
  // =========================
  const verifyPayment = async (resp: any) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payment/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
            registrationId: registration?.id
          })
        }
      );

      const result = await response.json();

      if (result.status === 'success') {
        navigate('/confirmation', {
          state: { registrationId: registration?.id }
        });
      } else {
        setError('Payment verification failed');
      }

    } catch (err) {
      console.error(err);
      setError('Payment verification error');
    }
  };

  // =========================
  // UI
  // =========================
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!registration) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>

      <p><strong>Delegate:</strong> {registration.delegateName}</p>
      <p><strong>Amount:</strong> ₹{registration.totalAmount}</p>

      <button onClick={startPayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  );
};

export default PaymentPortal;
