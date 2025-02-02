import QueryBuilder from '../../builder/QueryBuilder';
import { userModel } from '../user/user.model';
import { courseSearchableField } from './blog.constant';
import { TBlog } from './blog.interface';
import { blogModel } from './blog.model';

const createBlog = async (payload: TBlog, email: string) => {
  const userData = await userModel.findOne({ email: email });

  const result = await blogModel.create({ ...payload, author: userData?._id });
  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  console.log(query)
  const courseQuery = new QueryBuilder(
    blogModel.find().populate('author'),
    query,
  )
    .search(courseSearchableField)
    .sortBy()
    .sortOrder();

  const result = courseQuery.modelQuery;
  return result;
};

const updateBlog = async (
  payload: Partial<TBlog>,
  id: string,
  email: string,
) => {
  // current user
  const userData = await userModel.findOne({ email: email });
  const currentUserId = userData?._id.toString();

  // update able blog
  const findUserOwnBlog = await blogModel.findOne({ author: currentUserId });
  const blogAuthor = findUserOwnBlog?.author.toString();

  //  check if the update able blog is user own blog
  if (currentUserId === blogAuthor) {
    const result = await blogModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new Error('You are unAuthorized !! This is not your blog');
  }
};

const deleteBlog = async (id: string, email: string) => {
  // current user
  const userData = await userModel.findOne({ email: email });
  const currentUserId = userData?._id.toString();

  // delete able blog
  const findUserOwnBlog = await blogModel.findOne({ author: currentUserId });
  const blogAuthor = findUserOwnBlog?.author.toString();
  console.log(blogAuthor === currentUserId);
  // check if the delete able blog is user own blog
  if (currentUserId === blogAuthor) {
    const result = await blogModel.deleteOne({ _id: id });
    return result;
  } else {
    throw new Error('You are unAuthorized !! This is not your blog');
  }
};

const deleteBlogByAdmin = async (id:string)=>{

  const result = await blogModel.deleteOne({ _id: id });
  return result;
}





export const blogService = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin
};
