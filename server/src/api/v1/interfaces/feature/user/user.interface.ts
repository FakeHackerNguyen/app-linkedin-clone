import {Types, Document} from 'mongoose';

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
  educations: Array<{
    school: Types.ObjectId;
    fieldOfStudy: string;
    degree: string;
    grade: number;
    activities: string;
    description: string;
    skills: Array<string>;
    startEducation: Date;
    endEducation: Date;
  }>;
  experiences: Array<{
    company: Types.ObjectId;
    jobTitle: string;
    typeEmployment: string;
    description: string;
    location: string;
    locationType: string;
    industry: string;
    skills: Array<string>;
    startWork: Date;
    endWork: Date;
  }>;
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
