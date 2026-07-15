import { calculateStreak } from '../services/stats.service.js';
import { Request, Response } from 'express';

export const getStats = async (req: Request, res: Response) => {
  const habitId = req.params.habitId as string;

  if (!req.userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  try {
    const streak = await calculateStreak(habitId, req.userId);
    return res.status(200).json(streak);
  } catch (error) {
    return res.status(404).json({ message: `Server error --> ${error}` });
  }
};
