import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.user 
  const result = await blogService.createBlog(req.body,email);

  res.send({
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
});

export const blogController = {
  createBlog,
};
