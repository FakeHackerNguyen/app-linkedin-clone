import cloudinary from '../../../config/cloudinary';
import PostService from '../services/post.service';
import AppError from '../utils/appError';
import catchAsyncError from '../utils/catchAsyncError';

export const createPost = catchAsyncError(async (req, res, next) => {
  const {file, fileType} = req;
  const user = req.user?.data;
  const {content, visibility, commentControl} = req.body;

  let post = null;

  if (!user) {
    return next(new AppError('User is authenticated. Login again', 401));
  }

  if (file) {
    const {secure_url: url, public_id} = await cloudinary.uploader.upload(
      file.path,
      {
        folder: 'posts',
        resource_type: 'auto',
      },
    );

    const mediaPost = {
      url,
      public_id,
      resource_type: fileType as string,
    };

    post = await PostService.createPost(
      user,
      content,
      mediaPost,
      visibility,
      commentControl,
    );

    if (!post) return next(new AppError('Creating post is error', 400));
  }

  res.status(200).json({
    data: {
      post,
    },
  });
});

export const getPost = catchAsyncError(async (req, res, next) => {});
