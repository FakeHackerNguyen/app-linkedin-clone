import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import UserService from '../services/user.service';

export const login = catchAsyncError(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password)
    return next(new AppError('Please input email or password', 400));

  const existingUser = await UserService.getUser(email);
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
    await UserService.createToken(existingUser);

  res.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  res.json({
    accessToken,
    accessTokenUpdateAt: new Date().toLocaleString(),
    user: existingUser,
  });
});

export const register = catchAsyncError(async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;

  const existingUser = await UserService.getUser(email);
  if (existingUser) return next(new AppError('Email is already in use', 400));

  await UserService.createUser(firstName, lastName, email, password);

  res.json({message: 'User was successfully created'});
});

export const logout = catchAsyncError(async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1] ?? null;

  if (!accessToken) {
    return next(
      new AppError(
        'Something went wrong! Please contact to admin or login again',
        500,
      ),
    );
  }

  await UserService.deleteToken(accessToken);
  res.cookie('refreshToken', 'logged-out', {
    expires: new Date(Date.now() + 2000),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({
    message: 'Logout succesfully',
  });
});

export const regrantAccessToken = catchAsyncError(async (req, res, next) => {});
