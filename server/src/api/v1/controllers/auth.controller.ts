import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import {formatUser} from '../utils';

export const getUserProfile = catchAsyncError(async (req, res, next) => {
  if (req.user?.data && 'data' in req.user) {
    const {data, newAccessToken} = req.user;

    if (!data) return next(new AppError('User not found', 404));

    res.json({
      data: {
        user: formatUser(data),
        accessToken: newAccessToken,
      },
    });
  } else {
    return next(new AppError('User is not authenticated', 401));
  }
});
