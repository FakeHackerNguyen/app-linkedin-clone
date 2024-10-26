import {Schema, model} from 'mongoose';
import IRelationship from '../interfaces/feature/user/relationship.interface';

const relationshipSchema = new Schema<IRelationship>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true},
);

export default model<IRelationship>('Relationship', relationshipSchema);
