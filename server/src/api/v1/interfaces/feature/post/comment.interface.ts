import {Document, Types} from 'mongoose';

export interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
}
