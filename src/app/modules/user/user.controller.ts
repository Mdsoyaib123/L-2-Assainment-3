import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { userService } from './user.servise';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.send({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
