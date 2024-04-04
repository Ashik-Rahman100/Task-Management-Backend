import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../users/users.interface';
import { User } from '../users/users.model';
import { IRefreshTokenResponse } from './auth.interface';

// Create User
const createUser = async (payload: IUser): Promise<IUser> => {
  const savedUser = await User.create(payload);
  return savedUser;
};
// Login User
const loginUser = async (payload: any) => {
  const { email: emailPayload, password } = payload;
  // console.log(emailPayload, password);
  // check user
  const isUserExist = await User.isUserExist(emailPayload);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is Not found');
  }
  // check Password
  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not  exist');
  }

  // Create A access Token
  // Create Access Token & refresh token
  const { _id, role, email } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  // console.log(accessToken, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};
// refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    // invalid token
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );

    console.log(verifiedToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  // const { userId } = verifiedToken;
  // // checking user refresh token
  // const isUserExist = await User.isUserExist(userId);
  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exits.');
  // }

  const { email } = verifiedToken;
  const user = await User.isUserExist(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // generate new Access Token
  const newAccessToken = jwtHelpers.createToken(
    { _id: user?._id, role: user?.role, email: email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = { createUser, loginUser, refreshToken };
