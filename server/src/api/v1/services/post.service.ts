import IUser from '../interfaces/feature/user/user.interface';
import postModel from '../models/post.model';
import IPost from '../interfaces/feature/post/post.interface';

export default class PostService {
  static async createPost(
    user: IUser,
    content: string,
    media: {url: string; public_id: string; resource_type: string},
    visibility?: string,
    commentControl?: string,
  ): Promise<IPost | null> {
    const newPost = new postModel({
      user: user._id,
      content,
      media,
      visibility,
      commentControl,
    });

    const savedPost = await newPost.save();
    const postId = savedPost._id;

    const post = await postModel
      .findById(postId)
      .populate('user', 'fullName avatar headline')
      .lean();

    return post;
  }
}
