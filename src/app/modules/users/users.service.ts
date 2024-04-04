/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';

// Get single User
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
// Get All Users
const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find({});

  return result;
};
// Get All Users
const getMyProfile = async (user: JwtPayload | null): Promise<IUser | null> => {
  // console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }
  // console.log(user._id);
  const result = await User.findOne({ _id: user._id });
  return result;
};
// Update User
const updateUser = async (
  id: string,
  payload: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
// Update User
const updateMyProfile = async (
  user: JwtPayload | null,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const isExist = await User.findOne({ _id: user._id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate(
    { _id: user._id },
    updatedUserData,
    { new: true },
  );
  return result;
};
// Get single User
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
