import {Schema, model} from 'mongoose';
import {
  IEmailToken,
  EmailType,
} from '../interfaces/feature/auth/token.interface';

const emailTokenSchema = new Schema<IEmailToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: EmailType,
    required: true,
  },
  content: {
    type: String,
    required: function (): boolean {
      return this.type === 'NOTIFICATION';
    },
  },
  token: {
    type: String,
    required: function (): boolean {
      return this.type === 'OTP';
    },
  },
  createdAt: {
    type: Date,
    expires: 5 * 60,
    required: function (): boolean {
      return this.type === 'OTP';
    },
  },
});

export default model<IEmailToken>('EmailToken', emailTokenSchema);
