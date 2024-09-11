import {Schema, model} from 'mongoose';
import Token from '../interfaces/feature/auth/token.interface';

const tokenSchema = new Schema<Token>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60,
  },
});

export default model<Token>('Token', tokenSchema);
