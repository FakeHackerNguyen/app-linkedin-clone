import {Types} from 'mongoose';

export default interface Token {
  user: Types.ObjectId;
  refreshToken: string;
  accessToken: string;
  createdAt: Date;
}
