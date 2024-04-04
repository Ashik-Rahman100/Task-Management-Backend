import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { cowsFilterableFields } from './cows.constants';
import { ICows } from './cows.interface';
import { CowsService } from './cows.service';

// Create User
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow } = req.body;
  const result = await CowsService.createCow(cow);

  sendResponse<ICows>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow create successfully',
    data: result,
  });
});

// Get Single User
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowsService.getSingleCow(id);

  sendResponse<ICows>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Cow successfully',
    data: result,
  });
});
// Get All Users
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, cowsFilterableFields);
  const result = await CowsService.getAllCows(paginationOptions, filters);

  sendResponse<ICows[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All Cows successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update User
const updateCows = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowsService.updateCow(id, req.body);

  sendResponse<ICows>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Cow successfully',
    data: result,
  });
});

// Delete User
const deleteCows = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowsService.deleteCow(id);

  sendResponse<ICows>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Delete Cows  successfully',
    data: result,
  });
});

export const CowsController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCows,
  deleteCows,
};
