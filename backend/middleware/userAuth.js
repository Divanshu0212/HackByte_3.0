import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    console.log('Cookies received:', req.cookies);
    const { token } = req.cookies;

    if (!token) {
        console.log('No token found in cookies');
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        console.log('Attempting to verify token...');
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verification result:', tokenDecode);

        if (tokenDecode.id) {
            // Set userId on the req object itself
            req.userId = tokenDecode.id;

            // Initialize req.body if it doesn't exist
            if (!req.body) req.body = {};

            // Also set it on req.body for backward compatibility
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;