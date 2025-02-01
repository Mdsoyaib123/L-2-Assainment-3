import { userModel } from '../user/user.model';
import { TBlog } from './blog.interface';
import { blogModel } from './blog.model';

const createBlog = async (payload: TBlog, email: string) => {
  const userData = await userModel.findOne({ email: email });

  const result = await blogModel.create({ ...payload, author: userData?._id });
  return result;
};

const updateBlog = async (
  payload: Partial<TBlog>,
  id: string,
  email: string,
) => {
  // current user
  const userData = await userModel.findOne({ email: email });
  const currentUserId = userData?._id.toString()

  if (currentUserId !== id) {
    throw new Error('You are unAuthorized !! This is not your blog');
  }
  const result = await blogModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
};
