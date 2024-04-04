import {
  ICowsBreed,
  ICowsCategory,
  ICowsLabel,
  ICowsLocation,
} from './cows.interface';

export const cowsLocation: ICowsLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const cowsBreed: ICowsBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];
export const cowsLabel: ICowsLabel[] = ['for sale', 'sold out'];
export const cowsCategory: ICowsCategory[] = ['Beef', 'Dairy', 'Dual Purpose'];
export const cowsSearchableFields = ['location', 'breed', 'category'];
export const cowsFilterableFields = [
  'SearchTerm',
  'minPrice',
  'maxPrice',
  'location',
];
