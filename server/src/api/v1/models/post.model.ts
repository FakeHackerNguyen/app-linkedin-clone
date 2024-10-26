import {Schema, model} from 'mongoose';
import IPost, {
  CommentControl,
  Visibility,
} from '../interfaces/feature/post/post.interface';

const postSchema = new Schema<IPost>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    media: {
      type: Object,
      url: String,
      public_id: String,
      resource_type: String,
    },
    visibility: {
      type: String,
      enum: Visibility,
      default: Visibility.ANYONE,
    },
    commentControl: {
      type: String,
      enum: CommentControl,
      default: CommentControl.ANYONE,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<IPost>('Post', postSchema);
