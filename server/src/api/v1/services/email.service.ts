import jwt, {JwtPayload} from 'jsonwebtoken';
import Nodemailer from '../../../config/nodemailer';
import {randomDigit} from '../utils';
import emailTokenModel from '../models/emailToken.model';
import userModel from '../models/user.model';
import {EmailType} from '../interfaces/feature/auth/token.interface';
import {templateOTP} from '../templates';
import IUser from '../interfaces/feature/auth/user.interface';

export default class EmailService {
  private static instance: Nodemailer;

  private constructor() {}

  public static getInstance(): Nodemailer {
    if (!EmailService.instance) {
      EmailService.instance = new Nodemailer();
    }

    return EmailService.instance;
  }

  public static async sendOTP(user: IUser, title: string): Promise<void> {
    const randomOtp = randomDigit(6);
    const otpJwtSecret = process.env.OTP_JWT_SECRET as string;
    const otpJwtSecretExpires = process.env.OTP_JWT_EXPIRES_IN as string;
    const otpToken = jwt.sign(
      {otp: randomOtp, email: user.email},
      otpJwtSecret,
      {
        expiresIn: otpJwtSecretExpires,
      },
    );

    const from = `Social Job <${process.env.EMAIL_FROM}>`;
    const to = user.email;
    const subject = 'OTP';
    const html = templateOTP(
      `${user.firstName} ${user.lastName}`,
      randomOtp,
      title,
    );

    await this.getInstance().sendMail(from, to, subject, html);
    console.log(randomOtp);
    await emailTokenModel.create({
      user: user._id,
      type: EmailType.OTP,
      token: otpToken,
      createdAt: Date.now(),
    });
  }
  public static async sendNotification(
    user: IUser,
    content: string,
  ): Promise<void> {
    const from = `Social Job <${process.env.EMAIL_FROM}>`;
    const to = user.email;
    const subject = 'OTP';
    const html = content;

    await this.getInstance().sendMail(from, to, subject, html);
    await emailTokenModel.create({
      user: user._id,
      type: EmailType.NOTIFICATION,
      content,
    });
  }
  public static async verifyOTP(otp: string, user: IUser): Promise<boolean> {
    const emailToken = await emailTokenModel
      .findOne({user: user._id})
      .sort({createdAt: -1})
      .limit(1);

    const otpJwtSecret = process.env.OTP_JWT_SECRET as string;
    const otpPayload = jwt.verify(emailToken?.token as string, otpJwtSecret, {
      ignoreExpiration: true,
    }) as JwtPayload;

    if (
      otpPayload.otp !== otp ||
      (otpPayload.exp as number) * 1000 <= Date.now()
    ) {
      return false;
    }

    await emailTokenModel.deleteOne({user: user._id});
    return true;
  }
}
