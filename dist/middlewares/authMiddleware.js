import { handleRefreshToken } from './refreshTokenMiddleware.js';
import { verifyAT } from '../utils/auth.js';
export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return handleRefreshToken(req, res, next); // Call function Y if no token
    }
    const payload = verifyAT(token);
    if (!payload) {
        return handleRefreshToken(req, res, next); // Call function Y if token is invalid
    }
    next(); // Proceed to next middleware/route handler
};
