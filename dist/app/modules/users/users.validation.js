"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const users_constants_1 = require("./users.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'User password is required',
        }),
        role: zod_1.z.enum([...users_constants_1.userRole], {
            required_error: 'User role is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'User first name is required',
            }),
            secondName: zod_1.z.string({ required_error: 'User second name is required' }),
        }),
        email: zod_1.z.string({ required_error: 'User email is required' }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...users_constants_1.userRole]).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string({
                required_error: 'User first name is required',
            }),
            secondName: zod_1.z.string({
                required_error: 'User second name is required',
            }),
        })
            .optional(),
        email: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = { createUserZodSchema, updateUserZodSchema };
