import { z } from 'zod';
import { userRole } from './users.constants';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'User password is required',
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'User role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'User first name is required',
      }),
      secondName: z.string({ required_error: 'User second name is required' }),
    }),
    email: z.string({ required_error: 'User email is required' }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    name: z
      .object({
        firstName: z.string({
          required_error: 'User first name is required',
        }),
        secondName: z.string({
          required_error: 'User second name is required',
        }),
      })
      .optional(),
    email: z.string().optional(),
  }),
});

export const UserValidation = { createUserZodSchema, updateUserZodSchema };
