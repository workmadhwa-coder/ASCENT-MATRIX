import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';

const router = Router();

// =======================
// PAYMENT ROUTES
// =======================

// Create Razorpay order
router.post('/payment/create-order', createOrder);

// Verify payment
router.post('/payment/verify', verifyPayment);

export default router;
