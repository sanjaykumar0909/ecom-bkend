import {Request, Response} from "express"
import * as user from '../models/User.js';
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import {generateAT, generateRT} from "../utils/auth.js"

const prisma = new PrismaClient();

export default async function signup(req: Request, res: Response): Promise<Response>{
    console.log('/signup');
    
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await user.isExist(email)

    if (existingUser) {  
        return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Create JWT token
    const accessToken = generateAT(email, '2m')

    const refreshToken = generateRT(email, '10m')
    
    res.cookie("email", email, {
        httpOnly: true,
        maxAge: 3600000
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        maxAge: 3600000
    });

    // Send response
    return res.status(201).json({ email, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
