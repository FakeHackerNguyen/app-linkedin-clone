import {Types} from 'mongoose';
import userModel from '../models/user.model';
import IUser from '../interfaces/feature/user/user.interface';
import {Education, Experience} from '../interfaces';
import emailTokenModel from '../models/emailToken.model';
import relationshipModel from '../models/relationship.model';
import connectionModel from '../models/connection.model';
import IConnection, {
  StatusConnection,
} from '../interfaces/feature/user/connection.interface';
import IRelationship from '../interfaces/feature/user/relationship.interface';

export default class UserService {
  static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await userModel.create({
      firstName,
      lastName,
      email,
      password,
      fullName: `${firstName} ${lastName}`,
    });
  }
  static async updateUser(
    email: string,
    location: string,
    headline: string,
    experiences: Array<Experience>,
    educations: Array<Education>,
  ): Promise<boolean> {
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) return false;

    existingUser.location = location;
    if (headline) existingUser.headline = headline;
    if (experiences) {
      existingUser.experiences = experiences;
    }
    if (educations) {
      existingUser.educations = educations.map(e => {
        return {
          school: e.school,
          startStudy: e.startStudy ? new Date(e.startStudy) : undefined,
          endStudy: e.endStudy ? new Date(e.endStudy) : undefined,
        };
      });
    }

    await existingUser.save();
    return true;
  }
  // ADDITONAL WAY
  // static async getUserByEmail(
  //   email: string,
  // ): Promise<InstanceType<typeof userModel> | null> {
  //   const existingUser = await userModel.findOne({email: {$eq: email}});

  //   return existingUser;
  // }
  static async getUserByEmail(email: string): Promise<IUser | null> {
    const existingUser = await userModel.findOne({email: {$eq: email}});

    return existingUser;
  }
  static async getUserById(_id: Types.ObjectId): Promise<IUser | null> {
    const existingUser = await userModel.findById(_id);

    return existingUser;
  }

  static async getUsersByName(query: string): Promise<IUser[]> {
    const q = query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');

    const allUsers = await userModel.find().lean();
    const users = allUsers.filter(value =>
      value.fullName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
    return users;
  }

  static async checkUserPassword(
    user: IUser,
    password: string,
  ): Promise<boolean> {
    return user.comparePassword(password);
  }
  static async updateUserPassword(
    user: IUser,
    newPassword: string,
  ): Promise<void> {
    user.password = newPassword;

    await emailTokenModel.deleteOne({user: user._id, for: 'Forgot Password'});
    await user.save();
  }
  static async checkRelationshipExist(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId,
  ): Promise<boolean> {
    const relationshipExists = await relationshipModel.exists({
      follower: followerId,
      following: followingId,
    });

    if (relationshipExists) {
      return true;
    }

    return false;
  }
  static async createRelationship(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId,
  ): Promise<void> {
    await Promise.all([
      userModel.findByIdAndUpdate(
        followingId,
        {$addToSet: {followers: followerId}},
        {new: true},
      ),
      userModel.findByIdAndUpdate(
        followerId,
        {$addToSet: {following: followingId}},
        {new: true},
      ),
    ]);

    await relationshipModel.create({
      follower: followerId,
      following: followingId,
    });
  }
  static async deleteRelationship(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId,
  ): Promise<void> {
    await Promise.all([
      userModel.findByIdAndUpdate(
        followingId,
        {$pull: {followers: followerId}},
        {new: true},
      ),
      userModel.findByIdAndUpdate(
        followerId,
        {$pull: {following: followingId}},
        {new: true},
      ),
    ]);

    await relationshipModel.deleteOne({
      follower: followerId,
      following: followingId,
    });
  }
  static async getRelationship(
    followerId: Types.ObjectId,
  ): Promise<IRelationship[]> {
    const relationships = await relationshipModel
      .find({
        follower: followerId,
      })
      .populate('following', '_id fullName avatar location')
      .lean();

    return relationships;
  }
  static async checkConnectionExist(
    requestId: Types.ObjectId,
    recipentId: Types.ObjectId,
  ): Promise<boolean> {
    const connectionExists = await connectionModel.exists({
      requester: requestId,
      recipient: recipentId,
    });

    if (connectionExists) {
      return true;
    }

    return false;
  }
  static async getConnectionById(
    _id: Types.ObjectId,
  ): Promise<IConnection | null> {
    const existingConnection = await connectionModel.findById(_id);

    return existingConnection;
  }
  static async getConnectionByRequesterAndRecipient(
    requesterId: Types.ObjectId,
    recipientId: Types.ObjectId,
  ): Promise<IConnection | null> {
    const existingConnection = await connectionModel.findOne({
      requester: requesterId,
      recipient: recipientId,
    });

    return existingConnection;
  }
  static async getFriendConnection(
    user: IUser,
    page: number,
    limit: number,
  ): Promise<IConnection[]> {
    const connections = await connectionModel
      .find({
        _id: {$in: user?.connections},
        status: {$eq: StatusConnection.FRIEND},
      })
      .populate('requester recipient', 'fullName avatar headline')
      .skip((page - 1) * limit)
      .limit(limit);

    return connections;
  }
  static async deleteConnection(connectionId: Types.ObjectId): Promise<void> {
    const deletedConnection =
      await connectionModel.findByIdAndDelete(connectionId);

    if (deletedConnection) {
      const reqConnection = await connectionModel.findOneAndDelete({
        requester: deletedConnection.recipient,
        recipient: deletedConnection.requester,
      });

      await userModel.findByIdAndUpdate(reqConnection?.recipient, {
        $pull: {connections: connectionId},
      });
      await userModel.findByIdAndUpdate(reqConnection?.requester, {
        $pull: {connections: reqConnection?._id},
      });
    }
  }
  static async createConnection(
    requesterId: Types.ObjectId,
    recipientId: Types.ObjectId,
    note: string,
  ): Promise<void> {
    const reqConnection = await connectionModel.create({
      requester: requesterId,
      recipient: recipientId,
      status: StatusConnection.REQUESTED,
      note,
    });
    const recConnection = await connectionModel.create({
      requester: recipientId,
      recipient: requesterId,
      status: StatusConnection.PENDING,
      note,
    });

    await userModel.findByIdAndUpdate(requesterId, {
      $push: {connections: reqConnection._id},
    });
    await userModel.findByIdAndUpdate(recipientId, {
      $push: {connections: recConnection._id},
    });
  }
}
