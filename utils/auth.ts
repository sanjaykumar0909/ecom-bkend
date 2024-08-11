import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.JWT_AT as string;
const refreshTokenSecret = process.env.JWT_RT as string;

export const verifyAT = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, accessTokenSecret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRT = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, refreshTokenSecret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const generateAT = (user: string, expire: string): string => {
  return jwt.sign({ id: user }, accessTokenSecret, { expiresIn: expire });
};

export const generateRT = (user: string, expire: string): string => {
    return jwt.sign({ id: user }, refreshTokenSecret, { expiresIn: expire });
};
  