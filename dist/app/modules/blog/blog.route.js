"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/blogs', (0, auth_1.default)(user_constant_1.userRole.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.blogValidationSchema), blog_controller_1.blogController.createBlog);
router.get('/blogs', blog_controller_1.blogController.getAllBlog);
router.patch('/blogs/:id', (0, auth_1.default)(user_constant_1.userRole.user), blog_controller_1.blogController.updateBlog);
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.userRole.user), blog_controller_1.blogController.deleteBlog);
// delete blog by admin 
router.delete('/admin/blogs/:id', (0, auth_1.default)(user_constant_1.userRole.admin), blog_controller_1.blogController.deleteBlogByAdmin);
exports.blogRoutes = router;
