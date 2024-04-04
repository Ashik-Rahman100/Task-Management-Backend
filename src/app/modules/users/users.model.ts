/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { userRole } from './users.constants';
import { IUser, UserModel } from './users.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
      default: 'user',
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      secondName: {
        type: String,
        require: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

// Is Exists User
userSchema.statics.isUserExist = async function (
  id: string,
): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email: id },
    { _id: 1, password: 1, email: 1, role: 1 },
  );
};
// Password Matched
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
// Hash password
userSchema.pre('save', async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});
// Data --> check ? same year && same semester
// Handle validation conflict  | duplicate data handle or validation ( exist semester and year )
userSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    name: this.name,
    role: this.role,
    email: this.email,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User  is already exist !');
  }
  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
