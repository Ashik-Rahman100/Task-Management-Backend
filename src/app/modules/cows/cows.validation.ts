import { z } from 'zod';
import { cowsBreed, cowsCategory, cowsLabel } from './cows.constants';

const createCowsZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Cow name is required' }),
    age: z.number({ required_error: 'Cow age is required' }),
    price: z.number({ required_error: 'Cow price is required' }),
    breed: z.enum([...cowsBreed] as [string, ...string[]], {
      required_error: 'breed is Required.',
    }),
    weight: z.number({ required_error: 'Cows weight is required' }),
    label: z.enum([...cowsLabel] as [string, ...string[]], {
      required_error: 'label is Required.',
    }),
    category: z.enum([...cowsCategory] as [string, ...string[]], {
      required_error: 'category is Required.',
    }),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
});
// Update Cows Zod Schema
const updateCowsZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Cow name is required' }).optional(),
    age: z.number({ required_error: 'Cow age is required' }).optional(),
    price: z.number({ required_error: 'Cow price is required' }).optional(),
    breed: z
      .enum([...cowsBreed] as [string, ...string[]], {
        required_error: 'breed is Required.',
      })
      .optional(),
    weight: z.number({ required_error: 'Cows weight is required' }).optional(),
    label: z
      .enum([...cowsLabel] as [string, ...string[]], {
        required_error: 'label is Required.',
      })
      .optional(),
    category: z
      .enum([...cowsCategory] as [string, ...string[]], {
        required_error: 'category is Required.',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'seller is required',
      })
      .optional(),
  }),
});

export const CowsValidation = { createCowsZodSchema, updateCowsZodSchema };
