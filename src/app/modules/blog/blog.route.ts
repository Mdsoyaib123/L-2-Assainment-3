import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middlware/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.post(
  '/blogs',
  auth(userRole.user,userRole.admin),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);


export const blogRoutes  = router;
