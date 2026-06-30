import mongoose, { Schema, model, Document } from 'mongoose';

interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  color?: string;
  targetFrequency: 'daily' | 'weekly';
  timesPerPeriod?: number;
}

const habitSchema = new Schema<IHabit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String },
    targetFrequency: {
      type: String,
      enum: ['daily', 'weekly'],
      required: true,
    },
    timesPerPeriod: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Habit = model<IHabit>('Habit', habitSchema);

export default Habit;
