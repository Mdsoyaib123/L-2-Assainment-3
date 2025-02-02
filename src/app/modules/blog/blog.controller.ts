import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await blogService.createBlog(req.body, email);

  res.send({
    success: true,
    message: 'Blog created successfully',
    statusCode: 200,
    data: result,
  });
});
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlog(req.query);

  res.send({
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await blogService.updateBlog(req.body, req.params.id, email);
  res.send({
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  console.log(email);
  const result = await blogService.deleteBlog(req.params.id, email);
  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
    data: result,
  });
});


const deleteBlogByAdmin = catchAsync(async (req: Request, res: Response)=>{

  const result = await blogService.deleteBlogByAdmin(req.params.id)
 
  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
    data: result,
  });
})



export const blogController = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin
};
