"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
// parser
app.use(express_1.default.json());
// app.use(cookieParser());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'] }));
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello Next level developers!!!!');
});
exports.default = app;
