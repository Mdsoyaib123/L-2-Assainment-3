import { userRole } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};


export type TUserRole = keyof typeof userRole;