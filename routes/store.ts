import express, { Router, Request, Response } from "express"
import { authenticateUser } from "../middlewares/authMiddleware.js";

const store : Router = express.Router()

store.get("/store", authenticateUser, (req: Request, res: Response)=>{
    console.log('/store')
    res.status(200).json(req.user)
})

export default store