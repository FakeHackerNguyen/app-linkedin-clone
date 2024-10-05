import {Request} from 'express';
import IUser from './feature/user/user.interface';

export interface CustomRequest extends Request {
  reqUser?: IUser;
  reqFiles?: Express.Multer.File[];
}

export type Experience = {
  company: {
    avatar: {
      url: string;
      public_id: string;
    };
    name: string;
    typeOfBusiness: string;
  };
  jobTitle: string;
  typeEmployment?: string;
  description?: string;
  location?: string;
  locationType?: string;
  industry?: string;
  skills?: Array<string>;
  startWork?: Date;
  endWork?: Date;
};

export type Education = {
  school: {
    avatar: {
      url: string;
      public_id: string;
    };
    name: string;
    region: string;
  };
  fieldOfStudy?: string;
  degree?: string;
  grade?: number;
  activities?: string;
  description?: string;
  skills?: Array<string>;
  startEducation: Date;
  endEducation: Date;
};
