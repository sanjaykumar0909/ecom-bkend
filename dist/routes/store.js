import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const store = express.Router();
store.get("/store", authenticateUser, (req, res) => {
    console.log('/store');
    res.status(200).json(req.user);
});
export default store;
