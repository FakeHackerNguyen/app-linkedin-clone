import {Document} from 'mongoose';

export default interface IUniversity extends Document {
  name: string;
  avatar: {
    url: string;
    public_id: string;
  };
  location: string;
  website: string;
  description: string;
}
