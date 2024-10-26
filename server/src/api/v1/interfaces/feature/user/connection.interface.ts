import {Document, Types} from 'mongoose';

export enum StatusConnection {
  REQUESTED = 'REQUESTED',
  PENDING = 'PENDING',
  FRIEND = 'FRIEND',
}

export default interface IConnection extends Document {
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status: StatusConnection;
  note: string;
}
