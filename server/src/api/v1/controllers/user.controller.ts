import jwt, {JwtPayload} from 'jsonwebtoken';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import UserService from '../services/user.service';
import EmailService from '../services/email.service';
import AuthService from '../services/auth.service';
import cloudinary from '../../../config/cloudinary';
import {formatUser} from '../utils';
import {Types} from 'mongoose';
import {StatusConnection} from '../interfaces/feature/user/connection.interface';

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
      user: formatUser(existingUser),
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

export const sendOtp = catchAsyncError(async (req, res, next) => {
  const {email, reason} = req.body;

  if (!reason) return next(new AppError('Reason is required!', 401));

  const existingUser = await UserService.getUserByEmail(email);
  if (!existingUser) return next(new AppError('Email is not found', 404));

  await EmailService.sendOTP(existingUser, reason);

  res.status(200).json({
    data: {
      message: `OTP was successfully sent to ${existingUser.email}`,
    },
  });
});

export const verifyOTPToken = catchAsyncError(async (req, res, next) => {
  const {otp, reason, email} = req.body;

  if (!otp || !email || !reason)
    return next(new AppError('Please input otp or email or reason', 401));

  const existingUser = await UserService.getUserByEmail(email);
  if (!existingUser) return next(new AppError('User not found', 404));

  const isValidOTP = await EmailService.verifyOTP(reason, otp, existingUser);
  if (!isValidOTP)
    return next(new AppError('OTP is not correct or expired', 404));

  existingUser.isVerified = true;
  await existingUser.save();

  req.user = {data: existingUser};
  next();
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const {newPassword} = req.body;
  const user = req.user!.data;

  if (!user || !newPassword) return next(new AppError('Unknown error', 400));

  await UserService.updateUserPassword(user, newPassword);

  res.status(200).json({
    data: {
      message: 'Password is reset successfully. Please login again',
    },
  });
});

export const updateInfoUser = catchAsyncError(async (req, res, next) => {
  const {email, location, headline, experiences, educations} = req.body;

  const isSuccess = await UserService.updateUser(
    email,
    location,
    headline,
    experiences,
    educations,
  );

  if (!isSuccess) {
    return next(new AppError('Updating user is fail', 400));
  }

  res.status(200).json({
    data: {
      message: 'Upading user is success',
    },
  });
});

export const getPublicUser = catchAsyncError(async (req, res, next) => {
  const {id} = req.params;

  const user = await UserService.getUserById(new Types.ObjectId(id));

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    data: {
      user: formatUser(user),
    },
  });
});

export const getUser = catchAsyncError(async (req, res, next) => {});

export const updateAvatar = catchAsyncError(async (req, res, next) => {
  const {email} = req.body;
  const files = req.files;

  const existingUser = await UserService.getUserByEmail(email);
  if (!existingUser) return next(new AppError('User is not found', 404));

  if (Array.isArray(files) && files[0]) {
    const avatarId = existingUser.avatar.public_id;
    if (avatarId) {
      if (!avatarId.includes('default-avatar')) {
        const {result} = await cloudinary.uploader.destroy(avatarId);
        if (result !== 'ok') {
          return next(new AppError('Failed to delete old avatar', 400));
        }
      }
    }
    const {secure_url: url, public_id} = await cloudinary.uploader.upload(
      files[0].path,
      {folder: 'avatars'},
    );

    existingUser.avatar = {url, public_id};
    existingUser.save();
  }

  res.json({
    data: {
      message: 'Uploading avatar is successful',
    },
  });
});

export const followUser = catchAsyncError(async (req, res, next) => {
  const followerId = new Types.ObjectId(req.user?.data._id as string);
  const followingId = new Types.ObjectId(req.params.id);

  const relationshipExists = await UserService.checkRelationshipExist(
    followerId,
    followingId,
  );

  if (relationshipExists) {
    return next(new AppError('Already following this user', 400));
  }

  await UserService.createRelationship(followerId, followingId);

  res.status(200).json({
    message: 'Follow user successfully',
  });
});

export const unfollowUser = catchAsyncError(async (req, res, next) => {
  const followerId = new Types.ObjectId(req.user?.data._id as string);
  const followingId = new Types.ObjectId(req.params.id);

  const relationshipExists = await UserService.checkRelationshipExist(
    followerId,
    followingId,
  );

  if (!relationshipExists) {
    return next(new AppError('Relationship does not exist', 400));
  }

  await UserService.deleteRelationship(followerId, followingId);

  res.status(200).json({
    data: {
      message: 'Unfollow user successfully',
    },
  });
});

export const getFollowingUsers = catchAsyncError(async (req, res, next) => {
  const relationships = await UserService.getRelationship(
    new Types.ObjectId(req.user?.data._id as string),
  );

  const followingUsers = relationships
    .map(relationship => ({
      ...relationship.following,
      followingSince: relationship.createdAt,
    }))
    .sort((a, b) => b.followingSince.getTime() - a.followingSince.getTime());

  res.status(200).json(followingUsers);
});

export const requestConnection = catchAsyncError(async (req, res, next) => {
  const {id} = req.params;
  const requesterId = new Types.ObjectId(req.user?.data._id as string);
  const {note} = req.body;

  if (new Types.ObjectId(id).equals(requesterId)) {
    return next(new AppError("You can't connect to yourself", 400));
  }

  const recipientUser = await UserService.getUserById(new Types.ObjectId(id));
  if (!recipientUser) {
    return next(new AppError('User is not found', 404));
  }

  const connectionExist = await UserService.checkConnectionExist(
    requesterId,
    new Types.ObjectId(recipientUser._id as string),
  );

  if (connectionExist) {
    return next(new AppError('Connection is existing!', 400));
  }

  await UserService.createConnection(
    requesterId,
    new Types.ObjectId(recipientUser._id as string),
    note,
  );

  res.status(200).json({
    data: {
      message: `Sent request to ${recipientUser.fullName}`,
    },
  });
});

export const responseConnection = catchAsyncError(async (req, res, next) => {
  const {id} = req.params;
  const userId = req.user?.data._id as string;
  const {accept} = req.body;

  const recConnection = await UserService.getConnectionById(
    new Types.ObjectId(id),
  );

  if (!recConnection) {
    return next(new AppError('Connection is not found', 404));
  }

  if (!new Types.ObjectId(userId).equals(recConnection.requester._id)) {
    return next(new AppError('You can not reject this connection', 400));
  }

  const reqConnection = await UserService.getConnectionByRequesterAndRecipient(
    recConnection.recipient,
    recConnection.requester,
  );

  if (!reqConnection) {
    return next(new AppError('Something went wrong', 500));
  }

  if (accept) {
    recConnection.status = StatusConnection.FRIEND;
    reqConnection.status = StatusConnection.FRIEND;
    await reqConnection.save();
    await recConnection.save();
    await UserService.createRelationship(
      recConnection.recipient,
      recConnection.requester,
    );
    res.status(200).json({
      data: {message: 'Confirmed successfully'},
    });
  } else {
    await UserService.deleteConnection(new Types.ObjectId(id));
    res.status(200).json({
      data: {message: 'Rejected successfully'},
    });
  }
});
export const removeConnection = catchAsyncError(async (req, res, next) => {
  const {id} = req.params;
  const connection = await UserService.getConnectionById(
    new Types.ObjectId(id),
  );

  if (!connection) {
    return next(new AppError('Connection is not found', 404));
  }

  await UserService.deleteConnection(new Types.ObjectId(id));

  res.status(200).json({
    data: {message: 'Remove connection succefully'},
  });
});
export const getConnections = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page as string, 10);
  const limit = parseInt(req.query.limit as string, 10);

  const user = req.user!.data;

  const connections = await UserService.getFriendConnection(user, page, limit);

  res.json({
    data: {
      connections,
    },
  });
});
