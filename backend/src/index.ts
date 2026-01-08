import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // In production, limit this to your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

// Fix: Cast middleware to any to resolve "No overload matches this call" errors where 
// TypeScript confuses standard middleware functions with the path parameter overload.
app.use(express.json() as any);
app.use(express.urlencoded({ extended: true }) as any);

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', paymentRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'Ascent Matrix Secure API is active',
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 Ascent Matrix API: http://localhost:${PORT}`);
  console.log(`🔑 Razorpay Mode: ${process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test') ? 'Test' : 'Live'}`);
  console.log('--------------------------------------------------');
});
