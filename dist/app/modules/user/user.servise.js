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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(payload);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    // check user already exit using statics method
    if (!userData) {
        throw new Error('The user is not found');
    }
    // check if the user is blocked
    const Status = userData === null || userData === void 0 ? void 0 : userData.isBlocked;
    if (Status) {
        throw new Error('The user is blocked ');
    }
    //   check if the password is correct
    const passwordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!passwordMatch) {
        throw new Error('The password is incorrect');
    }
    // crate access token and send to client
    const jwtData = {
        email: userData === null || userData === void 0 ? void 0 : userData.email,
        role: userData === null || userData === void 0 ? void 0 : userData.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtData, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt_access_token, {
        expiresIn: '12h',
    });
    return {
        accessToken,
    };
});
exports.userService = {
    createUser,
    login
};
