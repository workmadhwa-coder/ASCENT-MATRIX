
import { razorpay } from '../utils/razorpay.js';
import crypto from 'crypto';
import { db } from '../config/firebase.js';

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const createOrder = async (req: any, res: any) => {
  try {
    const { amount, registrationId } = req.body;
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: "Amount is required and must be a number" });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: registrationId || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: RZP_KEY_ID
    });
  } catch (error: any) {
    console.error("[ORDER] Error:", error);
    return res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

export const verifyPayment = async (req: any, res: any) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature, 
    registrationId 
  } = req.body;

  try {
    if (!RZP_KEY_SECRET) {
      throw new Error("Razorpay Secret Key is missing in environment");
    }
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RZP_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // 🔥 UPDATE FIREBASE AFTER VERIFICATION
      // Ensure the registration exists and update its status to 'PAID'
      await db
        .collection("registrations")
        .doc(registrationId)
        .update({
          paymentStatus: "PAID",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          paidAt:  new Date()
        });

      return res.status(200).json({ status: "success" });
    } else {
      return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Verification failed", message: error.message });
  }
};
  