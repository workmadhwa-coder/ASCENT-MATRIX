import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// 🔥 Initialize Firebase
import './config/firebase.js';

// Routes
import paymentRoutes from './routes/payment.routes.js';

const app = express();

/**
 * ✅ FIX: Cast PORT to Number
 * process.env.PORT is a string, but app.listen requires a number.
 */
const PORT: number = Number(process.env.PORT) || 3000;

// ===============================
// ✅ CORS CONFIG
// ===============================
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ascent-matrix-ok7p.onrender.com' // Frontend URL
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.options('*', cors());

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ===============================
// Routes
// ===============================
app.use('/api/payment', paymentRoutes);

// Health Check
app.get('/', (_req, res) => {
  res.json({
    status: 'online',
    message: 'Ascent Matrix Secure API is active',
    port: PORT
  });
});

// ===============================
// Start Server
// ===============================
// Use '0.0.0.0' as the host for Render compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 API running on port ${PORT}`);
  
  // Safe Firebase logging
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log(`🔥 Firebase Project: ${sa.project_id}`);
    } catch (e) {
      console.log('🔥 Firebase initialized (Service Account hidden)');
    }
  }
  
  console.log(
    `🔑 Razorpay Mode: ${
      process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test') ? 'Test' : 'Live'
    }`
  );
  console.log('--------------------------------------------------');
});
