import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import {authRouter, userRouter,teacherRouter, adminRouter} from "./routes/routes.js"
import { checkAdminAuth, checkAuth, checkStudentAuth, checkTeacherAuth } from './middleware/auth.middleware.js';
import { getAllData } from './controllers/database.controller.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    ...(process.env.CLIENT_URL || '').split(','),
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
].map((origin) => origin.trim()).filter(Boolean);

const isLocalOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || isLocalOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked request from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    preflightContinue: false,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use('/ping', (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.use(cookieParser());

app.use('/auth',authRouter);

app.use('/about',getAllData);

app.use('/user',checkAuth,checkStudentAuth,userRouter);



app.use('/teacher',checkAuth,checkTeacherAuth,teacherRouter);

app.use('/admin',checkAuth,checkAdminAuth,adminRouter);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});
