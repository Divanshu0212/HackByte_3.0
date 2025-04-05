import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    console.log('Cookies:', req.cookies); // Debug log
    const { token } = req.cookies;

    if (!token) {
        console.log('No token found in cookies'); // Debug log
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', tokenDecode); // Debug log

        if (tokenDecode.id) {
            // Set userId on the req object itself
            req.userId = tokenDecode.id;
            
            // Initialize req.body if it doesn't exist
            if (!req.body) req.body = {};
            
            // Also set it on req.body for backward compatibility
            req.body.userId = tokenDecode.id;
            console.log('User authenticated:', tokenDecode.id); // Debug log
        } else {
            console.log('Token decode failed - no id'); // Debug log
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;