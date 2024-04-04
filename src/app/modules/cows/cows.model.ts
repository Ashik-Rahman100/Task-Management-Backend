import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import {
  cowsBreed,
  cowsCategory,
  cowsLabel,
  cowsLocation,
} from './cows.constants';
import { CowsModel, ICows } from './cows.interface';

const cowSchema = new Schema<ICows, CowsModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowsLocation,
    },
    breed: {
      type: String,
      required: true,
      enum: cowsBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cowsLabel,
      default: 'for sale',
    },
    category: {
      type: String,
      required: true,
      enum: cowsCategory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

// Data --> check ? same year && same semester
// Handle validation conflict  | duplicate data handle or validation ( exist semester and year )
cowSchema.pre('save', async function (next) {
  const isExist = await Cows.findOne({
    name: this.name,
    age: this.age,
    location: this.location,
    label: this.label,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Cow is  already exist !');
  }
  next();
});

export const Cows = model<ICows, CowsModel>('Cows', cowSchema);
