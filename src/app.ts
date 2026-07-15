import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import habitRouter from './routes/habit.routes.js';
import logRouter from './routes/log.routes.js';
import statsRouter from './routes/stats.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/auth', authRouter);
app.use('/habits', habitRouter);
app.use('/logs', logRouter);
app.use('/stats', statsRouter);

app.listen(PORT, () =>
  console.log(`Servidor ejecutandose en el puerto ${PORT}`),
);

export default app;
