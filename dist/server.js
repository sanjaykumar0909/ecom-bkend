import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import auth from './routes/auth.js';
const app = express();
dotenv.config();
const PORT = parseInt(process.env.PORT || '3001', 10);
// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow cookies to be sent
};
app.use(cors(corsOptions));
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/auth', auth);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
