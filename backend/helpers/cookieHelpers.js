// backend/helpers/cookieHelpers.js
export const setAuthCookie = (res, token) => {
  // When you set the cookie, make sure you have these options:
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // For cross-site requests in production
    domain: process.env.NODE_ENV === 'production' ? 'pixelpirates.vercel.app' : 'localhost', // Adjust to your domain
    path: '/',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
};