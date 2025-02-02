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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token) {
            throw new Error(' token not found ');
        }
        // check if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token);
        const { email, role } = decoded;
        const userData = yield user_model_1.userModel.findOne({ email: email });
        // check user already exit
        if (!userData) {
            throw new Error('The user is not found');
        }
        // check if the user is blocked
        const Status = userData === null || userData === void 0 ? void 0 : userData.isBlocked;
        if (Status) {
            throw new Error('The user is blocked ');
        }
        // role base Authorized
        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not Authorized !!!!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
