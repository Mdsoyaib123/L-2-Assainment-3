import { userModel } from '../user/user.model';
import { TBlog } from './blog.interface';
import { blogModel } from './blog.model';

const createBlog = async (payload: TBlog, email: string) => {
  const userData = await userModel.findOne({ email: email });
 
  const result = await blogModel.create({ ...payload, author: userData?._id });
  return result;
};

export const blogService = {
  createBlog,
};
