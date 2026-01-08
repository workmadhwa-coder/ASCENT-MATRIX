
import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { generateAndEmail, downloadTicket } from '../controllers/ticket.controller.js';
import { adminLogin, getDashboardStats, exportData, getRegistrations, getSponsorships } from '../controllers/admin.controller.js';
import { volunteerCheckIn } from '../controllers/volunteer.controller.js';

const router = Router();

// Payment & Tickets
router.post('/payment/create-order', createOrder);
router.post('/payment/verify', verifyPayment);
router.post('/ticket/generate-and-email', generateAndEmail);
router.post('/ticket/download', downloadTicket);

// Admin
router.post('/admin/login', adminLogin);
router.get('/admin/registrations', getRegistrations);
router.get('/admin/sponsorships', getSponsorships);
router.get('/admin/stats', getDashboardStats);
router.get('/admin/export', exportData);

// Volunteer
router.post('/volunteer/check-in', volunteerCheckIn);

export default router;
