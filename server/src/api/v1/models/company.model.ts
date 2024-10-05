import {model, Schema} from 'mongoose';
import ICompany from '../interfaces/feature/page/company.interface';

const companySchema = new Schema<ICompany>({
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
  industry: {
    type: String,
    required: true,
  },
  website: String,
  location: String,
  size: String,
  description: String,
});

export default model<ICompany>('Company', companySchema);
