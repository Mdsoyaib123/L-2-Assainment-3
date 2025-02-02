"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHan_1 = __importDefault(require("./app/middlware/globalErrorHan"));
// parser
app.use(express_1.default.json());
// app.use(cookieParser());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'] }));
app.get("/", (req, res) => {
    res.json(" app is running ");
});
// application routes
app.use('/api', routes_1.default);
// handle global error 
app.use(globalErrorHan_1.default);
exports.default = app;
