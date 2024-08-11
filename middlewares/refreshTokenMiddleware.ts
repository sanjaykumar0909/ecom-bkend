import { Request, Response, NextFunction } from 'express';
import { verifyRT, generateAT } from '../utils/auth.js';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any; // Define the type as per your payload structure
    }
  }
}

export const handleRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies['refreshToken']; 

  if (!refreshToken) {
    return res.status(401).json({ error: 'Access token and refresh token are missing' });
  }

  const payload = verifyRT(refreshToken);

  if (!payload) {
    return res.status(401).json({ error: 'Expired refresh token' });
  }

  const newAccessToken = generateAT(payload.id, '2m');

  req.user={
    email: req.cookies.email,
    jwt: newAccessToken
  }

  next();
};
