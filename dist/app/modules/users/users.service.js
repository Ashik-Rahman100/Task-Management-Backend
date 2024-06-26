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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("./users.model");
// Get single User
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findById(id);
    return result;
});
// Get All Users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.find({});
    return result;
});
// Get All Users
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    // console.log(user._id);
    const result = yield users_model_1.User.findOne({ _id: user._id });
    return result;
});
// Update User
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
// Update User
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const isExist = yield users_model_1.User.findOne({ _id: user._id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist.');
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield users_model_1.User.findOneAndUpdate({ _id: user._id }, updatedUserData, { new: true });
    return result;
});
// Get single User
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
