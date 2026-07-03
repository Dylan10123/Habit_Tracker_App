import { authMiddleware } from '../middleware/auth.js';
import {
  getHabits,
  createHabit,
  editHabit,
  deleteHabit,
} from '../controllers/habit.controller.js';
import { Router } from 'express';

const habitRouter = Router();

habitRouter.get('/', authMiddleware, getHabits);
habitRouter.post('/', authMiddleware, createHabit);
habitRouter.put('/:id', authMiddleware, editHabit);
habitRouter.delete('/:id', authMiddleware, deleteHabit);

export default habitRouter;
