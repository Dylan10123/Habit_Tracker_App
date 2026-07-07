import { Request, Response } from 'express';
import Log from '../models/Log.js';
import Habit from '../models/Habit.js';

export const getLogs = async (req: Request, res: Response) => {
  const { habitId, month } = req.query;

  try {
    const filter: any = { userId: req.userId };
    if (habitId) filter.habitId = habitId;
    if (month) {
      const firstDay = new Date(`${month as string}-01`);
      const lastDay = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth() + 1,
        0,
      );
      filter.date = { $gte: firstDay, $lte: lastDay };
    }

    const logs = await Log.find(filter);

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ message: `Server error --> ${error}` });
  }
};

export const updateLogs = async (req: Request, res: Response) => {
  const { habitId } = req.params;
  const { note, date } = req.body;

  const newData = {
    habitId: habitId,
    userId: req.userId,
    completed: true,
    note: note,
    date: date,
  };

  try {
    const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const log = await Log.findOneAndUpdate(
      { habitId: habitId, userId: req.userId, date: date },
      { $set: newData },
      { upsert: true, new: true },
    );

    return res.status(200).json({
      message: 'Logs updated',
      newData: log,
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error --> ${error}` });
  }
};
