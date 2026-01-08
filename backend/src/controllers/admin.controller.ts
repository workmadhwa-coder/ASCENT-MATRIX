
import { db } from '../config/firebase.js';
import crypto from 'crypto';

export const adminLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
 const envEmail = process.env.ADMIN_EMAIL;
  
  if (email === envEmail && password === process.env.ADMIN_PASSWORD_RAW) {
    return res.status(200).json({ 
      status: 'success', 
      token: crypto.randomBytes(32).toString('hex') 
    });
  }
  
  return res.status(401).json({ status: 'failure', message: 'Unauthorized' });
};

export const getRegistrations = async (req: any, res: any) => {
  try {
    const snapshot = await db.collection('registrations').orderBy('registrationDate', 'desc').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

export const getSponsorships = async (req: any, res: any) => {
  try {
    const snapshot = await db.collection('sponsorships').orderBy('date', 'desc').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sponsorships" });
  }
};

export const getDashboardStats = async (req: any, res: any) => {
  try {
    const snapshot = await db.collection('registrations').get();
    const regs = snapshot.docs.map(doc => doc.data());
    
    const stats = {
      total: regs.length,
      paid: regs.filter((r: any) => r.paymentStatus === 'PAID').length,
      pending: regs.filter((r: any) => r.paymentStatus === 'PENDING').length,
      failed: regs.filter((r: any) => r.paymentStatus === 'FAILED').length,
      revenue: regs.filter((r: any) => r.paymentStatus === 'PAID').reduce((acc: number, r: any) => acc + (r.totalAmount || 0), 0),
      ticketsIssued: regs.filter((r: any) => r.paymentStatus === 'PAID').reduce((acc: number, r: any) => acc + (r.ticketCount || 0), 0)
    };
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const exportData = async (req: any, res: any) => {
  res.status(501).json({ message: 'Use frontend CSV utility for filtered exports' });
};
