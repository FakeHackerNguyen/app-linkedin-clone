import {Document, Types} from 'mongoose';

export enum Visibility {
  ANYONE = 'Anyone',
  ONLYCONNECTION = 'Connections only',
}

export enum CommentControl {
  ANYONE = 'Anyone',
  ONLYCONNECTION = 'Connections only',
  NOONE = 'No one',
}

export default interface IPost extends Document {
  content: string;
  user: Types.ObjectId;
  visibility: string;
  commentControl: string;
  media?: {
    url: string;
    public_id: string;
  };
  comments?: Array<Types.ObjectId>;
  likes?: Array<Types.ObjectId>;
}
