import {Schema, model} from 'mongoose';
import IConnection, {
  StatusConnection,
} from '../interfaces/feature/user/connection.interface';

const connectionSchema = new Schema<IConnection>({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: StatusConnection,
    default: StatusConnection.REQUESTED,
  },
});

export default model<IConnection>('Connection', connectionSchema);
