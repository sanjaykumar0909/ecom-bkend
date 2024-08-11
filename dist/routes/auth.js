import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
const auth = express.Router();
auth.post("/signup", signup);
auth.post("/login", login);
auth.get("/access", authenticateUser, (req, res) => {
    console.log('/access');
    res.status(200).json(req.user);
});
export default auth;
