import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { taskFilterableFields } from './task.constant';
import { ITask, ITaskFIlters } from './task.interface';
import { Tasks } from './task.model';

const createTask = async (payload: ITask): Promise<ITask> => {
  const result = await Tasks.create(payload);
  return result;
};
// Get single User
const getSingleTask = async (id: string): Promise<ITask | null> => {
  const result = await Tasks.findById(id);
  return result;
};
// Get All Users
const getAllTasks = async (
  pagination: IPaginationOptions,
  filters: ITaskFIlters,
): Promise<IGenericResponse<ITask[] | null>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, ...filtersData } = filters;

  // All Conditions here
  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: taskFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filter Data
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Tasks.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const count = await Tasks.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      count: count,
    },
    data: result,
  };
};
// Update Task
const updateTask = async (
  id: string,
  payload: ITask,
): Promise<ITask | null> => {
  const result = await Tasks.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// Get single User
const deleteTask = async (id: string): Promise<ITask | null> => {
  const result = await Tasks.findByIdAndDelete(id);
  return result;
};

export const TasksService = {
  createTask,
  getSingleTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
