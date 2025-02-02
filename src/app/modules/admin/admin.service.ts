import { userModel } from '../user/user.model';

const blockUserByAdmin = async (id: string) => {
  const result = await userModel.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true },
  );
  return result;
};

export const adminService = {
  blockUserByAdmin,
};
