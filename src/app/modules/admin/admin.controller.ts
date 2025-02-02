import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { adminService } from './admin.service';

const blockUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.blockUserByAdmin(req.params.userId);

  res.send({
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
    data:result
  });
});

export const adminController = {
  blockUserByAdmin,
};
