import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middlware/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.post(
  '/blogs',
  auth(userRole.user),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);
router.get('/blogs', blogController.getAllBlog);
router.patch('/blogs/:id', auth(userRole.user), blogController.updateBlog);
router.delete('/blogs/:id', auth(userRole.user), blogController.deleteBlog);
// delete blog by admin 
router.delete(
  '/admin/blogs/:id',
  auth(userRole.admin),
  blogController.deleteBlogByAdmin,
);
export const blogRoutes = router;
