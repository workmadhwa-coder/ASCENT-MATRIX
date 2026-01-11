import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import './config/firebase.js';
import paymentRoutes from './routes/payment.routes.js';

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://ascent-matrix-ok7p.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// Log every request for debugging
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Mount the routes at /api/payment
app.use('/api/payment', paymentRoutes);

app.get('/', (_req, res) => {
  res.json({ status: 'online', port: PORT });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${PORT}`);
});
