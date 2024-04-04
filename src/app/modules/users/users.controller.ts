import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './users.interface';
import { UserService } from './users.service';

// Get Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single User successfully',
    data: result,
  });
});
// Get All Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All User successfully',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.headers.authorization);
  // console.log('user=> ', req.user);
  const user = req.user;
  const myProfile = await UserService.getMyProfile(user);
  sendResponse<IUser>(res, {
    success: true,
    message: 'Successfully found user',
    data: myProfile,
    statusCode: httpStatus.OK,
  });
});

// Get Single User
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.updateUser(id, req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User successfully',
    data: result,
  });
});
// Get Single User
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await UserService.updateMyProfile(req.user, body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users information retrieved successfully',
    data: result,
  });
});

// Delete User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete User successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
