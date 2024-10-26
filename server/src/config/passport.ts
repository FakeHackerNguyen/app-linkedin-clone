import passport, {Profile} from 'passport';

import jwt, {JwtPayload} from 'jsonwebtoken';
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import UserService from '../api/v1/services/user.service';
import AuthService from '../api/v1/services/auth.service';
import IUser from '../api/v1/interfaces/feature/user/user.interface';

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const callbackURL = process.env.GOOGLE_CALLBACK_URL as string;

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    },
    async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await UserService.getUserByEmail(jwt_payload.email);
        if (user) {
          const refreshTokenFromDB = await AuthService.getTokenByUser(
            user as IUser,
          );

          if (!refreshTokenFromDB) {
            return done(null, false);
          }

          const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET as string;
          const refreshTokenPayload = jwt.verify(
            refreshTokenFromDB.refreshToken,
            jwtRefreshSecret,
          ) as JwtPayload;

          if (refreshTokenPayload.email !== jwt_payload.email) {
            return done(null, false);
          }

          const tokenExpiration = new Date((jwt_payload.exp as number) * 1000);
          const now = new Date();
          const timeDifference = tokenExpiration.getTime() - now.getTime();

          if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
            const payloadNew = {
              _id: user._id,
              email: user.email,
            };
            const newAccessToken = jwt.sign(
              payloadNew,
              process.env.JWT_SECRET as string,
              {
                expiresIn: '1h',
              },
            );

            return done(null, {
              data: user,
              newAccessToken,
            });
          }
          return done(null, {data: user});
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ): Promise<void> => {
      // return done(null, profile);
    },
  ),
);
