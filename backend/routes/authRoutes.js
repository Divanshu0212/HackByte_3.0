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
// import verifyTurnstile from '../middleware/verifyTurnstile.js'; // Comment this out

const authRouter = express.Router();

// Public routes that need human verification
authRouter.post('/register', /*verifyTurnstile,*/ register); // Comment out here too
authRouter.post('/login', /*verifyTurnstile,*/ login); // And here
authRouter.post('/send-reset-otp', /*verifyTurnstile,*/ sendResetOtp); // And here
authRouter.post('/reset-password', resetPassword);

// Authenticated routes that don't need Turnstile
authRouter.post('/logout', userAuth, logout);
authRouter.get('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);

export default authRouter;