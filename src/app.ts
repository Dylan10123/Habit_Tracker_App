import connectDB from './config/db.js';
import Habit from './models/Habit.js';
import User from './models/User.js';
import Log from './models/Log.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Servidor ejecutandose en el puerto ${PORT}`),
);

export default app;
