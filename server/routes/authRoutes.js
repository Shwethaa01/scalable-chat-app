import { Router } from 'express';
import { sendOtp, verifyOtp, signup } from '../controllers/authController.js';

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/signup', signup);

export default router;
