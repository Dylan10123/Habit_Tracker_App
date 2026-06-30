import mongoose, { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
  habitId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  completed: boolean;
  note?: string;
  date: Date;
}

const logSchema = new Schema<ILog>(
  {
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    completed: { type: Boolean, required: true },
    note: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const Log = model<ILog>('Log', logSchema);

export default Log;
