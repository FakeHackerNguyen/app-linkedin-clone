import tokenModel from '../models/token.model';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';

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
  static async getUser(
    email: string,
  ): Promise<InstanceType<typeof userModel> | null> {
    const existingUser = await userModel.findOne({email: {$eq: email}});

    return existingUser;
  }
  static async checkUserPassword(
    user: InstanceType<typeof userModel>,
    password: string,
  ): Promise<boolean> {
    return user.comparePassword(password);
  }
  static async createToken(user: InstanceType<typeof userModel>): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtExpires = process.env.JWT_EXPIRES_IN as string;
    const jwtRefreshSecret = process.env.JWT_SECRET as string;
    const jwtRefreshExpires = process.env.JWT_EXPIRES_IN as string;

    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpires,
    });
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
      expiresIn: jwtRefreshExpires,
    });

    await tokenModel.create({
      user: user._id,
      refreshToken,
      accessToken,
    });

    return {accessToken, refreshToken};
  }
  static async getToken(
    refreshToken: string,
  ): Promise<InstanceType<typeof tokenModel> | null> {
    const existingToken = await tokenModel.findOne({
      refreshToken: {$eq: refreshToken},
    });

    return existingToken;
  }
  static async deleteToken(accessToken: string): Promise<void> {
    await tokenModel.findOneAndDelete({accessToken});
  }
}
