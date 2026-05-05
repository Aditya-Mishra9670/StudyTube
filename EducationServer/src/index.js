import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import { authRouter, userRouter, teacherRouter, adminRouter } from "./routes/routes.js";
import { checkAdminAuth, checkAuth, checkStudentAuth, checkTeacherAuth } from './middleware/auth.middleware.js';
import { getAllData } from './controllers/database.controller.js';

dotenv.config();

const app = express();

/* ================== ✅ CLEAN CORS ================== */
const allowedOrigins = [
    ...(process.env.CLIENT_URL || '').split(','),
    'http://localhost:5173',                     // local frontend
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
    'https://education-iota-gold.vercel.app'     // production frontend
].map((origin) => origin.trim()).filter(Boolean);

const isLocalOrigin = (origin) =>
    /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);


app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || isLocalOrigin(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
}));
/* ================================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

/* ================== DB MIDDLEWARE ================== */
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("❌ DB Connection Failed:", err);
        return res.status(500).json({ message: "Database connection failed" });
    }
});
/* ================================================== */

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "pong" });
});

// Routes
app.use('/auth', authRouter);
app.use('/about', getAllData);
app.use('/user', checkAuth, checkStudentAuth, userRouter);
app.use('/teacher', checkAuth, checkTeacherAuth, teacherRouter);
app.use('/admin', checkAuth, checkAdminAuth, adminRouter);

// Local server only
if (!process.env.VERCEL) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
