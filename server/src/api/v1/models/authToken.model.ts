import {Schema, model} from 'mongoose';
import {IAuthToken} from '../interfaces/feature/auth/token.interface';

const authTokenSchema = new Schema<IAuthToken>({
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
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

export default model<IAuthToken>('AuthToken', authTokenSchema);
