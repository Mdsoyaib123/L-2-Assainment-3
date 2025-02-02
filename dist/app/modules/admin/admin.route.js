"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.patch('/admin/users/:userId/block', (0, auth_1.default)(user_constant_1.userRole.admin), admin_controller_1.adminController.blockUserByAdmin);
exports.adminRoutes = router;
