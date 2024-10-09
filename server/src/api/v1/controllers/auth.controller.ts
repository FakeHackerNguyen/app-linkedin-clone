import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import {formatUser} from '../utils';

export const getUserProfile = catchAsyncError(async (req, res, next) => {
  if (req.user && 'user' in req.user) {
    const {user, newAccessToken} = req.user;
    res.json({
      data: {
        user: formatUser(user),
        accessToken: newAccessToken,
      },
    });
  } else {
    return next(new AppError('User is not authenticated', 401));
  }
});
