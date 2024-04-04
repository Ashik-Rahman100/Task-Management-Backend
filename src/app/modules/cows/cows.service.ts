import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { cowsSearchableFields } from './cows.constants';
import { ICows, ICowsFIlters } from './cows.interface';
import { Cows } from './cows.model';

const createCow = async (payload: ICows): Promise<ICows> => {
  const result = (await Cows.create(payload)).populate('seller');
  return result;
};
// Get single User
const getSingleCow = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findById(id).populate('seller');
  return result;
};
// Get All Users
const getAllCows = async (
  pagination: IPaginationOptions,
  filters: ICowsFIlters,
): Promise<IGenericResponse<ICows[] | null>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  // All Conditions here
  const andConditions = [];

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });
  } else if (minPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  } else if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: cowsSearchableFields.map(field => ({
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
  const result = await Cows.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const count = await Cows.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      count: count,
    },
    data: result,
  };
};
// Update User
const updateCow = async (id: string, payload: ICows): Promise<ICows | null> => {
  const result = await Cows.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('seller');
  return result;
};
// Get single User
const deleteCow = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowsService = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
