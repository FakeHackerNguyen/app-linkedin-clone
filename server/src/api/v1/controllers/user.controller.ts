import jwt, {JwtPayload} from 'jsonwebtoken';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import UserService from '../services/user.service';
import EmailService from '../services/email.service';
import AuthService from '../services/auth.service';
import {CustomRequest} from '../interfaces';

export const login = catchAsyncError(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(new AppError('Please input email or password', 400));
  }

  const existingUser = await UserService.getUserByEmail(email);
  if (!existingUser)
    return next(
      new AppError(`Invalid credentials. Email: ${email} is not found`, 404),
    );

  const matchedPassword = await UserService.checkUserPassword(
    existingUser,
    password,
  );
  if (!matchedPassword)
    return next(
      new AppError('Invalid credentials. Email or Password is wrong', 400),
    );

  const {accessToken, refreshToken} =
    await AuthService.createToken(existingUser);

  res.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  res.json({
    data: {
      accessToken,
      accessTokenUpdateAt: new Date().toLocaleString(),
      user: existingUser,
    },
  });
});

export const register = catchAsyncError(async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;

  const existingUser = await UserService.getUserByEmail(email);
  if (existingUser) return next(new AppError('Email is already in use', 400));

  await UserService.createUser(firstName, lastName, email, password);

  res.json({
    data: {message: 'User was successfully created'},
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  // const accessToken = req.headers.authorization?.split(' ')[1] ?? null;
  const {refreshToken} = req.cookies;

  if (!refreshToken) {
    return next(
      new AppError(
        'Something went wrong! Please contact to admin or login again',
        500,
      ),
    );
  }

  await AuthService.deleteToken(refreshToken);
  res.cookie('refreshToken', 'logged-out', {
    expires: new Date(Date.now() + 2000),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({
    data: {
      message: 'Logout succesfully',
    },
  });
});

export const refreshToken = catchAsyncError(async (req, res, next) => {
  const {refreshToken} = req.body;

  const existingToken = await AuthService.getTokenByRefreshToken(refreshToken);
  if (!existingToken)
    return next(new AppError('User is not authenticated', 401));

  const existingUser = await UserService.getUserById(existingToken.user);
  if (!existingUser) return next(new AppError('User is not found', 404));

  const refreshTokenExpiresAt =
    ((jwt.decode(existingToken.refreshToken) as JwtPayload).exp as number) *
    1000;
  if (Date.now() >= refreshTokenExpiresAt) {
    await AuthService.deleteToken(existingToken.refreshToken);
    return next(new AppError('Expired refresh token', 401));
  }

  const payload = {
    _id: existingUser._id,
    email: existingUser.email,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.status(200).json({
    data: {
      accessToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    },
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const {email} = req.body;

  const existingUser = await UserService.getUserByEmail(email);
  if (!existingUser) return next(new AppError('Email is not found', 404));

  await EmailService.sendOTP(existingUser, 'Forgot Password');

  res.status(200).json({
    data: {
      message: `OTP was successfully sent to ${existingUser.email}`,
    },
  });
});
export const verifyOTPToken = catchAsyncError(
  async (req: CustomRequest, res, next) => {
    const {otp, email} = req.body;

    if (!otp || !email)
      return next(new AppError('Please input otp or email', 401));

    const existingUser = await UserService.getUserByEmail(email);
    if (!existingUser) return next(new AppError('User not found', 404));

    const isValidOTP = await EmailService.verifyOTP(otp, existingUser);
    if (!isValidOTP)
      return next(new AppError('OTP is not correct or expired', 404));

    req.email = email;
    next();
  },
);
export const resetPassword = catchAsyncError(
  async (req: CustomRequest, res, next) => {
    const {newPassword} = req.body;
    const {email} = req;

    await UserService.updateUserPassword(email as string, newPassword);

    res.status(200).json({
      data: {
        message: 'Password is reset successfully. Please login again',
      },
    });
  },
);
