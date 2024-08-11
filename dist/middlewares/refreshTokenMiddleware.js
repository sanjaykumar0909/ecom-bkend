import { verifyRT, generateAT } from '../utils/auth.js';
export const handleRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        return res.status(401).json({ error: 'Access token and refresh token are missing' });
    }
    const payload = verifyRT(refreshToken);
    if (!payload) {
        return res.status(401).json({ error: 'Expired refresh token' });
    }
    const newAccessToken = generateAT(payload.id, '2m');
    req.user = {
        email: req.cookies.email,
        jwt: newAccessToken
    };
    next();
};
