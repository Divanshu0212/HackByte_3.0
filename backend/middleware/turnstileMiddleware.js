const axios = require('axios');

const turnstileMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request body
    const { cfTurnstileResponse } = req.body;
    
    // If no token, return error
    if (!cfTurnstileResponse) {
      return res.status(400).json({ success: false, message: 'Human verification required' });
    }
    
    // Validate token using Cloudflare API
    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', cfTurnstileResponse);
    formData.append('remoteip', ip);
    
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    if (!response.data.success) {
      return res.status(400).json({ success: false, message: 'Human verification failed' });
    }
    
    // Verification passed, continue
    next();
  } catch (error) {
    console.error('Turnstile verification error:', error);
    res.status(500).json({ success: false, message: 'Verification error' });
  }
};

module.exports = turnstileMiddleware;