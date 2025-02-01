import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.router";

const router = Router();

const moduleRoute = [
  {
    path: "/api/auth",
    route: userRoutes,
  },
  // {
  //   path: "/api/auth",
  //   route: authRoutes,
  // },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
