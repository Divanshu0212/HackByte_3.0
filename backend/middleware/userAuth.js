import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

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
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;