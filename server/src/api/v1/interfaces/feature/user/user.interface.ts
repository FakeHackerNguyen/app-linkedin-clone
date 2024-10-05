import {Types, Document} from 'mongoose';
import {Education, Experience} from '../../index';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export default interface IUser extends Document {
  provider: string;
  googleId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  about: string;
  location: string;
  cover: {
    url: string;
    public_id: string;
  };
  avatar: {
    url: string;
    public_id: string;
  };
  headline: string;
  educations: Array<Education>;
  experiences: Array<Experience>;
  email: string;
  password: string;
  role: string;
  active: {
    status: boolean;
    lastestLogin: Date;
  };
  isVerified: boolean;
  comparePassword(password: string): boolean;
}

export interface AuthenticatedUser {
  user: IUser;
  newAccessToken?: string;
}
