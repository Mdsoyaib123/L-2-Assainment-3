import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);
router.post(
  '/login',
  validateRequest(userValidation.loginValidationSchema),
  userController.login,
);


export const userRoutes = router;
