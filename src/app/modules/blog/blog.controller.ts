import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.user 
  const result = await blogService.createBlog(req.body,email);

  res.send({
    success: true,
    message: 'Blog created successfully',
    statusCode: 200,
    data: result,
  });
});

const updateBlog = catchAsync(async (req:Request,res:Response)=>{
const {email} = req.user ;
  const result = await blogService.updateBlog(req.body,req.params.id,email)
  res.send({
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  })
})

export const blogController = {
  createBlog,
  updateBlog
};
