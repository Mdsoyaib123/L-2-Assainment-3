import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { userModel } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new Error(' token not found ');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    const { email, role } = decoded;

    const userData = await userModel.findOne({ email: email });
    // check user already exit
    if (!userData) {
      throw new Error('The user is not found');
    }

    // check if the user is blocked
    const Status = userData?.isBlocked;
    if (Status) {
      throw new Error('The user is blocked ');
    }

    // role base Authorized
    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error('You are not Authorized !!!!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
