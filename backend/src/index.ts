import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// 🔥 Initialize Firebase
import './config/firebase.js';

// Routes
import paymentRoutes from './routes/payment.routes.js';

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// ===============================
// ✅ CORS CONFIG
// ===============================
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ascent-matrix-ok7p.onrender.com' // Ensure this matches your Frontend URL
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
// This mounts the router at /api/payment
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
app.listen(PORT, '0.0.0.0', () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 API running on port ${PORT}`);
  console.log('--------------------------------------------------');
});
