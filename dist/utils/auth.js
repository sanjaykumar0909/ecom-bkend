import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const accessTokenSecret = process.env.JWT_AT;
const refreshTokenSecret = process.env.JWT_RT;
export const verifyAT = (token) => {
    try {
        return jwt.verify(token, accessTokenSecret);
    }
    catch (error) {
        return null;
    }
};
export const verifyRT = (token) => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    }
    catch (error) {
        return null;
    }
};
export const generateAT = (user, expire) => {
    return jwt.sign({ id: user }, accessTokenSecret, { expiresIn: expire });
};
export const generateRT = (user, expire) => {
    return jwt.sign({ id: user }, refreshTokenSecret, { expiresIn: expire });
};
