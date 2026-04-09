import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { connectDB } from './config/postgres.js';
import './models/userModels.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();

const port = process.env.PORT || 4000;


await connectDB();


const allowedOrigins = ['http://localhost:5173']

app.use(morgan('dev'));




app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: allowedOrigins, credentials: true }))


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) => res.send('API Working'))





app.listen(port, () => console.log(`Server is running on PORT ${port}`))
