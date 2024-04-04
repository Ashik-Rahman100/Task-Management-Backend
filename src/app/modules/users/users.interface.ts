/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export type IUserRole = 'user' | 'admin';

export type IUser = {
  password: string;
  role: IUserRole;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  _id?: mongoose.Schema.Types.ObjectId;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string,
  ): Promise<Pick<IUser, 'email' | 'password' | '_id' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
