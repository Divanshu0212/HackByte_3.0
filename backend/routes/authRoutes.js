import express from 'express';
import { 
  isAuthenticated, 
  login, 
  logout, 
  register, 
  resetPassword, 
  sendResetOtp, 
  sendVerifyOtp, 
  verifyEmail 
} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import { protect } from '../middleware/authMiddleware.js';
import verifyTurnstile from '../middleware/verifyTurnstile.js';

const authRouter = express.Router();

// Public routes that need human verification
authRouter.post('/register', verifyTurnstile, register);
authRouter.post('/login',verifyTurnstile, login);
authRouter.get('/send-reset-otp', verifyTurnstile, sendResetOtp);
authRouter.post('/reset-password', verifyTurnstile, resetPassword);

// Authenticated routes that don't need Turnstile
authRouter.post('/logout', userAuth, logout);
authRouter.get('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);

export default authRouter;