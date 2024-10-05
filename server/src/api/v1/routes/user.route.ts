import {Request, Response, Router} from 'express';
import {otpLimiter, signUpSignInLimiter} from '../middlewares/limiter';
import {
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  updateInfoUser,
  updateAvatar,
  verifyOTPToken,
  sendOtp,
} from '../controllers/user.controller';
import {addUserValidator, addUserValidatorHandler} from '../validators/user';
import {parseData} from '../utils';
import avatarUpload from '../middlewares/users/avatarUpload';

const router = Router();

router.post(
  '/register',
  signUpSignInLimiter,
  addUserValidator,
  addUserValidatorHandler,
  register,
);
router.post('/login', signUpSignInLimiter, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

router.post('/otp', sendOtp);
router.post('/verify-otp', verifyOTPToken, (_: Request, res: Response) => {
  res.status(200).json({
    data: {
      isValid: true,
    },
  });
});
router.patch('/reset-password', verifyOTPToken, resetPassword);

router.patch('/update-info', parseData, updateInfoUser);
router.patch('/update-avatar', avatarUpload, updateAvatar);

export default router;
