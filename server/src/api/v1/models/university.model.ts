import {model, Schema} from 'mongoose';
import ICompany from '../interfaces/feature/page/company.interface';
import IUniversity from '../interfaces/feature/page/university.interface';

const universitySchema = new Schema<IUniversity>({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object,
    url: String,
    public_id: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: String,
  description: String,
});

export default model<IUniversity>('University', universitySchema);
