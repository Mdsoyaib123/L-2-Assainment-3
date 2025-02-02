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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield blog_service_1.blogService.createBlog(req.body, email);
    res.send({
        success: true,
        message: 'Blog created successfully',
        statusCode: 200,
        data: result,
    });
}));
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.getAllBlog(req.query);
    res.send({
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: 200,
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield blog_service_1.blogService.updateBlog(req.body, req.params.id, email);
    res.send({
        success: true,
        message: 'Blog updated successfully',
        statusCode: 200,
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    console.log(email);
    const result = yield blog_service_1.blogService.deleteBlog(req.params.id, email);
    res.send({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
        data: result,
    });
}));
const deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.deleteBlogByAdmin(req.params.id);
    res.send({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    deleteBlogByAdmin
};
