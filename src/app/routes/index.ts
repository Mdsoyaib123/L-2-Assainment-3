import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoute = [
  {
    path: "/api/auth",
    route: userRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
