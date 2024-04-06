"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const task_constant_1 = require("./task.constant");
const task_model_1 = require("./task.model");
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Tasks.create(payload);
    return result;
});
// Get single User
const getSingleTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Tasks.findById(id);
    return result;
});
// Get All Users
const getAllTasks = (pagination, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(pagination);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    // All Conditions here
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: task_constant_1.taskFilterableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield task_model_1.Tasks.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield task_model_1.Tasks.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            count: count,
        },
        data: result,
    };
});
// Update Task
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Tasks.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Get single User
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Tasks.findByIdAndDelete(id);
    return result;
});
exports.TasksService = {
    createTask,
    getSingleTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
