import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// 🔥 Initialize Firebase
import './config/firebase.js';

// Routes
import paymentRoutes from './routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// ✅ UPDATED CORS CONFIG
// ===============================
const allowedOrigins = [
  'http://localhost:5173',
  'https://ascent-matrix-ok7p.onrender.com' // Ensure this is your FRONTEND URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors()); // Enable pre-flight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check & Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/payment', paymentRoutes); // Simplified route mounting

app.get('/', (_req, res) => {
  res.json({ status: 'online', service: 'Ascent Matrix API' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${PORT}`);
});
