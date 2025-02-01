import config from '../../config';
import { TUser } from '../user/user.interface';
import { userModel } from '../user/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (payload: TUser) => {
  const userData = await userModel.findOne({ email: payload?.email });

  // check user already exit using statics method
  if (!userData) {
    throw new Error('The user is not found');
  }

  // check if the user is blocked
  const Status = userData?.isBlocked;
  if (Status) {
    throw new Error('The user is blocked ');
  }

  //   check if the password is correct
  const passwordMatch = await bcrypt.compare(
    payload?.password,
    userData?.password,
  );

  if (!passwordMatch) {
    throw new Error('The password is incorrect');
  }

  // crate access token and send to client
  const jwtData = {
    email: userData?.email,
    role: userData?.role,
  };

  const accessToken = jwt.sign(jwtData, config?.jwt_access_token as string, {
    expiresIn: '12h',
  });

  return {
    accessToken,
  };
};

export const authService = {
  login,
};
