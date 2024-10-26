import {Types} from 'mongoose';

export default interface IRelationship {
  follower: Types.ObjectId;
  following: Types.ObjectId;
  createdAt: Date;
}
