import {Types} from 'mongoose';
import userModel from '../models/user.model';
import IUser from '../interfaces/feature/auth/user.interface';

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
    });
  }
  static async updateUser() {}
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
  static async checkUserPassword(
    user: IUser,
    password: string,
  ): Promise<boolean> {
    return user.comparePassword(password);
  }
  static async updateUserPassword(
    email: string,
    newPassword: string,
  ): Promise<void> {
    await userModel.updateOne({email}, {password: newPassword});
  }
}
