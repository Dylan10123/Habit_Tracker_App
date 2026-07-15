import Habit from '../models/Habit.js';
import Log from '../models/Log.js';
import {
  startOfWeek,
  endOfWeek,
  subDays,
  subWeeks,
  startOfDay,
  endOfDay,
} from 'date-fns';

export const calculateStreak = async (
  habitId: string,
  userId: string,
): Promise<number> => {
  const habit = await Habit.findOne({ _id: habitId });

  if (!habit) {
    throw new Error('Habit not found');
  }

  const timesPerPeriod = habit.timesPerPeriod ?? 1;

  const logs = await Log.find({ habitId: habitId, userId: userId });

  const weekly = habit.targetFrequency === 'weekly';

  const setStart = weekly
    ? (d: Date) => startOfWeek(d, { weekStartsOn: 1 })
    : startOfDay;

  const setEnd = weekly
    ? (d: Date) => endOfWeek(d, { weekStartsOn: 1 })
    : endOfDay;

  const subPeriod = weekly
    ? (d: Date) => subWeeks(d, 1)
    : (d: Date) => subDays(d, 1);

  let dateRef = new Date();
  dateRef = subPeriod(dateRef);
  let streak = 0;

  const maxIterations = 1000;
  let iterations = 0;

  while (iterations < maxIterations) {
    iterations++;
    const start = setStart(dateRef);
    const end = setEnd(dateRef);

    const logCount = logs.filter((log) => {
      return log.date >= start && log.date <= end;
    }).length;

    if (logCount < timesPerPeriod) {
      break;
    }

    streak++;
    dateRef = subPeriod(dateRef);
  }

  return streak;
};
