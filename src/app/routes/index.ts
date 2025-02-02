import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { blogRoutes } from "../modules/blog/blog.route";
import { adminRoutes } from "../modules/admin/admin.route";

const router = Router();

const moduleRoute = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/",
    route: blogRoutes,
  },
  {
    path: "/",
    route: adminRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
