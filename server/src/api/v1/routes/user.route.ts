import {Router} from 'express';
import {otpLimiter, signUpSignInLimiter} from '../middlewares/limiter';
import {
  forgotPassword,
  resetPassword,
  verifyOTPToken,
} from '../controllers/user.controller';
import {
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/user.controller';
import {addUserValidator, addUserValidatorHandler} from '../validators/user';

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

router.post('/password/forgot', forgotPassword);
router.patch('/password/reset', verifyOTPToken, resetPassword);

export default router;
