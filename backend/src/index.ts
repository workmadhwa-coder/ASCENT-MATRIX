import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// 🔥 Initialize Firebase ONCE
import './config/firebase.js';

import paymentRoutes from './routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// ✅ CORS (FINAL FIX)
// ===============================
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ascent-matrix-ok7p.onrender.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // ✅ IMPORTANT: must be false
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ preflight support

// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ===============================
// Routes
// ===============================
app.use('/api', paymentRoutes);

// Health
app.get('/', (_req, res) => {
  res.json({
    status: 'online',
    message: 'Ascent Matrix Secure API is active',
    port: PORT
  });
});

// ===============================
app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 API running on port ${PORT}`);
  console.log(
    `🔥 Firebase Project: ${
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!).project_id
    }`
  );
  console.log(
    `🔑 Razorpay Mode: ${
      process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test') ? 'Test' : 'Live'
    }`
  );
  console.log('--------------------------------------------------');
});
