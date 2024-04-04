import { Model } from 'mongoose';

export type ITask = {
  title: string;
  description: string;
};

export type TaskModel = Model<ITask, Record<string, unknown>>;
export type ITaskFIlters = {
  searchTerm?: string;
  title?: string;
  description?: number;
};
