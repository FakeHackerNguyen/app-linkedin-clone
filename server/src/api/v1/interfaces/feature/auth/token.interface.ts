import {Types, Document} from 'mongoose';

export enum EmailType {
  NOTIFICATION = 'NOTIFICATION',
  OTP = 'OTP',
}

export interface IAuthToken extends Document {
  user: Types.ObjectId;
  refreshToken: string;
  accessToken: string;
  createdAt: Date;
}

export interface IEmailToken extends Document {
  user: Types.ObjectId;
  type: string;
  for: string;
  content?: string;
  token?: string;
  createdAt?: Date;
}
