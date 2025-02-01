import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { authService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.send({
    statusCode: 200,
    success: true,
    message: ' user is logged in successfully  ',
    data: result,
  });
});

export const authController = {
  login,
};
