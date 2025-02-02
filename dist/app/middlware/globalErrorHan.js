"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = 500;
    let message = 'Something went wrong ';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const modifyError = (0, handleZodError_1.default)(err);
        statusCode = modifyError === null || modifyError === void 0 ? void 0 : modifyError.statusCode;
        message = modifyError === null || modifyError === void 0 ? void 0 : modifyError.message;
        errorSources = modifyError === null || modifyError === void 0 ? void 0 : modifyError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const modifyError = (0, handleValidationError_1.default)(err);
        statusCode = modifyError === null || modifyError === void 0 ? void 0 : modifyError.statusCode;
        message = modifyError === null || modifyError === void 0 ? void 0 : modifyError.message;
        errorSources = modifyError === null || modifyError === void 0 ? void 0 : modifyError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const modifyError = (0, handleCastError_1.default)(err);
        statusCode = modifyError === null || modifyError === void 0 ? void 0 : modifyError.statusCode;
        message = modifyError === null || modifyError === void 0 ? void 0 : modifyError.message;
        errorSources = modifyError === null || modifyError === void 0 ? void 0 : modifyError.errorSources;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
