"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const blog_route_1 = require("../modules/blog/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: "/auth",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: blog_route_1.blogRoutes,
    },
    {
        path: "/",
        route: admin_route_1.adminRoutes,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
