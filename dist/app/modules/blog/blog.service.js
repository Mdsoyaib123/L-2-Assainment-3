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
exports.blogService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlog = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel.findOne({ email: email });
    const result = yield blog_model_1.blogModel.create(Object.assign(Object.assign({}, payload), { author: userData === null || userData === void 0 ? void 0 : userData._id }));
    return result;
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const courseQuery = new QueryBuilder_1.default(blog_model_1.blogModel.find().populate('author'), query)
        .search(blog_constant_1.courseSearchableField)
        .sortBy()
        .sortOrder();
    const result = courseQuery.modelQuery;
    return result;
});
const updateBlog = (payload, id, email) => __awaiter(void 0, void 0, void 0, function* () {
    // current user
    const userData = yield user_model_1.userModel.findOne({ email: email });
    const currentUserId = userData === null || userData === void 0 ? void 0 : userData._id.toString();
    // update able blog
    const findUserOwnBlog = yield blog_model_1.blogModel.findOne({ author: currentUserId });
    const blogAuthor = findUserOwnBlog === null || findUserOwnBlog === void 0 ? void 0 : findUserOwnBlog.author.toString();
    //  check if the update able blog is user own blog
    if (currentUserId === blogAuthor) {
        const result = yield blog_model_1.blogModel.findOneAndUpdate({ _id: id }, payload, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    else {
        throw new Error('You are unAuthorized !! This is not your blog');
    }
});
const deleteBlog = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    // current user
    const userData = yield user_model_1.userModel.findOne({ email: email });
    const currentUserId = userData === null || userData === void 0 ? void 0 : userData._id.toString();
    // delete able blog
    const findUserOwnBlog = yield blog_model_1.blogModel.findOne({ author: currentUserId });
    const blogAuthor = findUserOwnBlog === null || findUserOwnBlog === void 0 ? void 0 : findUserOwnBlog.author.toString();
    console.log(blogAuthor === currentUserId);
    // check if the delete able blog is user own blog
    if (currentUserId === blogAuthor) {
        const result = yield blog_model_1.blogModel.deleteOne({ _id: id });
        return result;
    }
    else {
        throw new Error('You are unAuthorized !! This is not your blog');
    }
});
const deleteBlogByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.deleteOne({ _id: id });
    return result;
});
exports.blogService = {
    createBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    deleteBlogByAdmin
};
