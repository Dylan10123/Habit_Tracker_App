import { Request, Response } from 'express';
import Habit from '../models/Habit.js';

export const getHabits = async (req: Request, res: Response) => {
  const habits = await Habit.find({ userId: req.userId });
  return res.status(200).json(habits);
};

export const createHabit = async (req: Request, res: Response) => {
  const { name, category, color, targetFrequency, timesPerPeriod } = req.body;

  const newHabit = new Habit({
    userId: req.userId,
    name: name,
    category: category,
    color: color,
    targetFrequency: targetFrequency,
    timesPerPeriod: timesPerPeriod,
  });

  try {
    await newHabit.save();
  } catch (error) {
    return res.status(400).json({
      message: 'Missing requirements',
    });
  }

  return res.status(201).json({
    message: 'New habit created successfully',
    createdHabit: newHabit,
  });
};

export const editHabit = async (req: Request, res: Response) => {
  const { name, category, color, targetFrequency, timesPerPeriod } = req.body;
  const { id } = req.params;

  const newData = {
    name: name,
    category: category,
    color: color,
    targetFrequency: targetFrequency,
    timesPerPeriod: timesPerPeriod,
  };

  const habit = await Habit.findByIdAndUpdate(
    { _id: id, userId: req.userId },
    { $set: newData },
    { new: true },
  );

  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  return res.status(200).json({
    message: 'Habit updated',
    newData: habit,
  });
};

export const deleteHabit = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedHabit = await Habit.findByIdAndDelete({
    _id: id,
    userId: req.userId,
  });

  return deletedHabit
    ? res
        .status(200)
        .json({ message: 'Habit deleted', deletedHabit: deletedHabit })
    : res.status(404).json({ message: 'Habit not found' });
};
