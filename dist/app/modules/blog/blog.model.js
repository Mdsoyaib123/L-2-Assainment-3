"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    isPublished: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
});
exports.blogModel = (0, mongoose_1.model)('blog', blogSchema);
