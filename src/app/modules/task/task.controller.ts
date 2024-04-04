import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskFilterableFields } from './task.constant';
import { ITask } from './task.interface';
import { TasksService } from './task.service';

// Create User
const createTask = catchAsync(async (req: Request, res: Response) => {
  const { ...task } = req.body;
  const result = await TasksService.createTask(task);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task create successfully',
    data: result,
  });
});

// Get Single User
const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TasksService.getSingleTask(id);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single task successfully',
    data: result,
  });
});
// Get All Users
const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, taskFilterableFields);
  const result = await TasksService.getAllTasks(paginationOptions, filters);

  sendResponse<ITask[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All Task successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update User
const updateTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TasksService.updateTask(id, req.body);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Task successfully',
    data: result,
  });
});

// Delete User
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TasksService.deleteTask(id);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Delete Task successfully',
    data: result,
  });
});

export const TasksController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
