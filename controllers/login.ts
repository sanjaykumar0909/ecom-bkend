import { Request, Response, NextFunction } from "express";
import * as dbUser from '../models/User.js'
import bcrypt from "bcrypt"
import {generateAT, generateRT} from "../utils/auth.js"

export default async function login(req: Request, res: Response) {
  console.log("/login");

  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Check if user exists
    const user = await dbUser.getByEmail(email);
    
    if (!user) {
      return res.status(401).send({ error: "no user exist" });
    }

    let matches = await bcrypt.compare(password, user.password);
    if (!matches) return res.status(401).send({ error: "incorrect password"})

    // Create JWT 
    const accessToken = generateAT(email, "2m");

    const refreshToken = generateRT(email, "10m");

    res.cookie("email", email, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.status(201).json({ email, accessToken });
  } catch (e) {
    console.log(e);
  }
}