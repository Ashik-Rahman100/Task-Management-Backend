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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_constants_1 = require("./users.constants");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
        select: 0,
    },
    role: {
        type: String,
        enum: users_constants_1.userRole,
        required: true,
        default: 'user',
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        secondName: {
            type: String,
            require: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
// Is Exists User
userSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email: id }, { _id: 1, password: 1, email: 1, role: 1 });
    });
};
// Password Matched
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// Hash password
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        admin.password = yield bcrypt_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Data --> check ? same year && same semester
// Handle validation conflict  | duplicate data handle or validation ( exist semester and year )
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.User.findOne({
            name: this.name,
            role: this.role,
            email: this.email,
        });
        if (isExist) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User  is already exist !');
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
