import jwt, {JwtPayload} from 'jsonwebtoken';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

export const getUserProfile = catchAsyncError(async (req, res, next) => {
  if (req.user && 'user' in req.user) {
    const {user, newAccessToken} = req.user;
    res.json({
      data: {
        user,
        accessToken: newAccessToken,
      },
    });
  } else {
    return next(new AppError('User is not authenticated', 401));
  }
});
