import axios from 'axios'

const verifyTurnstile = async (req, res, next) => {
  const token = req.body.cfTurnstileResponse;
  
  if (!token) {
    return res.status(400).json({ error: 'Turnstile token missing' });
  }

  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET,
        response: token,
        remoteip: req.ip
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ error: 'Human verification failed' });
    }

    next();
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return res.status(500).json({ error: 'Error verifying human' });
  }
};

export default verifyTurnstile;