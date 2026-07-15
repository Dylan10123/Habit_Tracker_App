import { authMiddleware } from '../middleware/auth.js';
import { Router } from 'express';
import { getStats } from '../controllers/stats.controller.js';

const statsRouter = Router();

statsRouter.get('/:habitId', authMiddleware, getStats);

export default statsRouter;
