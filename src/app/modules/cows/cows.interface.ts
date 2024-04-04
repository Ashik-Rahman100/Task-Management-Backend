import { Model, Types } from 'mongoose';

export type ICowsLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ICowsBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
export type ICowsLabel = 'for sale' | 'sold out';
export type ICowsCategory = 'Dairy' | 'Beef' | 'Dual Purpose';
export type ICows = {
  name: string;
  age: number;
  price: number;
  location: ICowsLocation;
  breed: ICowsBreed;
  weight: number;
  label: ICowsLabel;
  category: ICowsCategory;
  seller: Types.ObjectId;
};
// academicFaculty: Types.ObjectId | IAcademicFaculty;
export type CowsModel = Model<ICows, Record<string, unknown>>;
export type ICowsFIlters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};
