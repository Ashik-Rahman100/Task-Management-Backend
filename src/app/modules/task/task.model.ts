import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ITask, TaskModel } from './task.interface';

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

// Data --> check ? same year && same semester
// Handle validation conflict  | duplicate data handle or validation ( exist semester and year )
taskSchema.pre('save', async function (next) {
  const isExist = await Tasks.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Task is  already exist !');
  }
  next();
});

export const Tasks = model<ITask, TaskModel>('Tasks', taskSchema);
