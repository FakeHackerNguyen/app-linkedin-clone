import {Document} from 'mongoose';

export default interface ICompany extends Document {
  name: string;
  avatar: {
    url: string;
    public_id: string;
  };
  industry: string;
  location?: string;
  website?: string;
  size?: string;
  description?: string;
}
