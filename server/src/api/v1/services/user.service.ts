import {Types} from 'mongoose';
import userModel from '../models/user.model';
import IUser from '../interfaces/feature/user/user.interface';
import {Experience} from '../interfaces';
import EmailService from './email.service';
import emailTokenModel from '../models/emailToken.model';

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
    experiences: Array<Experience>,
  ): Promise<boolean> {
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) return false;

    existingUser.location = location;
    existingUser.experiences = experiences;
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
}
