"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controller_1.userController.createUser);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userValidation.loginValidationSchema), user_controller_1.userController.login);
exports.userRoutes = router;
