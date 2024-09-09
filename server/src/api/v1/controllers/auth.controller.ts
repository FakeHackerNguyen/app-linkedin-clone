import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';

export const login = catchAsyncError(async (req, res, next) => {
  const {email, password} = req.body;
  res.json({
    email,
    password,
  });
});

export const register = catchAsyncError(async (req, res, next) => {});
