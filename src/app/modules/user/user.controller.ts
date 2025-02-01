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
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  res.send({
    success: true,
    message: ' Login successful  ',
    statusCode: 200,
    data: result,
  });
});

export const userController = {
  createUser,
  login
};
