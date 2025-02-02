import { Router } from 'express';
import { adminController } from './admin.controller';
import auth from '../../middlware/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.patch(
  '/admin/users/:userId/block',
  auth(userRole.admin),
  adminController.blockUserByAdmin,
);

export const adminRoutes = router;
