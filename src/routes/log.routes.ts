import { authMiddleware } from '../middleware/auth.js';
import { Router } from 'express';
import { updateLogs, getLogs } from '../controllers/log.controller.js';

const logRouter = Router();

logRouter.get('/', authMiddleware, getLogs);
logRouter.post('/:habitId', authMiddleware, updateLogs);

export default logRouter;
