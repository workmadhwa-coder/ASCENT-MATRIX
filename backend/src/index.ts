import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import './config/firebase';

// ✅ IMPORTANT: no `.js` extension in TS
import paymentRoutes from './routes/payment.routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ascent-matrix-ok7p.onrender.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 🔍 LOG EVERY REQUEST
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ ROUTES (THIS IS THE KEY LINE)
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'API running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${PORT}`);
});
