import jwt, {JwtPayload} from 'jsonwebtoken';
import authToken from '../models/authToken.model';
import userModel from '../models/user.model';
import IUser from '../interfaces/feature/auth/user.interface';
import {IAuthToken} from '../interfaces/feature/auth/token.interface';

export default class AuthService {
  static async createToken(user: IUser): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      _id: user._id,
      email: user.email,
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtExpires = process.env.JWT_EXPIRES_IN as string;
    const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET as string;
    const jwtRefreshExpires = process.env.REFRESH_JWT_EXPIRES_IN as string;

    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpires,
    });
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
      expiresIn: jwtRefreshExpires,
    });

    await authToken.create({
      user: user._id,
      refreshToken,
      accessToken,
    });

    return {accessToken, refreshToken};
  }
  static async getTokenByUser(user: IUser): Promise<IAuthToken | null> {
    const existingToken = await authToken.findOne({user: {$eq: user._id}});

    return existingToken;
  }
  static async getTokenByRefreshToken(
    refreshToken: string,
  ): Promise<IAuthToken | null> {
    const existingToken = await authToken.findOne({
      refreshToken: {$eq: refreshToken},
    });

    return existingToken;
  }
  static async deleteToken(refreshToken: string): Promise<void> {
    await authToken.findOneAndDelete({refreshToken: {$eq: refreshToken}});
  }
}
