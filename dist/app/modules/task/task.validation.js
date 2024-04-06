"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidation = void 0;
const zod_1 = require("zod");
const createTaskZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
    }),
});
// Update Task Zod Schema
const updateTaskZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        description: zod_1.z.string({ required_error: 'Title is required' }).optional(),
    }),
});
exports.TaskValidation = { createTaskZodSchema, updateTaskZodSchema };
