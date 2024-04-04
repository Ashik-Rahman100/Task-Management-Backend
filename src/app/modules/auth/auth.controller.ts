import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../users/users.interface';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await AuthService.createUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
});
// Create user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await AuthService.loginUser(user);
  const { refreshToken, ...othersUserData } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: othersUserData,
  });
});
// create Refresh Token Handler
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = { createUser, loginUser, refreshToken };
