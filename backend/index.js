import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
import  {connectDB}  from './config/db.js';
connectDB();


import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



