import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlware/validateRequest';
import { authValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);


export const authRoutes = router;