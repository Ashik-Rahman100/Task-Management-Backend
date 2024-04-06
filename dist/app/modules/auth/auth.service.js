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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const users_model_1 = require("../users/users.model");
// Create User
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const savedUser = yield users_model_1.User.create(payload);
    return savedUser;
});
// Login User
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: emailPayload, password } = payload;
    // console.log(emailPayload, password);
    // check user
    const isUserExist = yield users_model_1.User.isUserExist(emailPayload);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is Not found');
    }
    // check Password
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) &&
        !(yield users_model_1.User.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not  exist');
    }
    // Create A access Token
    // Create Access Token & refresh token
    const { _id, role, email } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    // console.log(accessToken, refreshToken);
    return {
        accessToken,
        refreshToken,
    };
});
// refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        // invalid token
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        console.log(verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token.');
    }
    // const { userId } = verifiedToken;
    // // checking user refresh token
    // const isUserExist = await User.isUserExist(userId);
    // if (!isUserExist) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exits.');
    // }
    const { email } = verifiedToken;
    const user = yield users_model_1.User.isUserExist(email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    // generate new Access Token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ _id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role, email: email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = { createUser, loginUser, refreshToken };
