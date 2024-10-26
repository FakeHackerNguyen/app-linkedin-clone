import {model, Schema} from 'mongoose';
import {IComment} from '../interfaces/feature/post/comment.interface';

const commentSchema = new Schema<IComment>(
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
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  },
);

export default model<IComment>('Comment', commentSchema);
