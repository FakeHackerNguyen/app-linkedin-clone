import {Request, Response, Router} from 'express';
import {
  followLimiter,
  otpLimiter,
  signUpSignInLimiter,
} from '../middlewares/limiter';
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
  followUser,
  unfollowUser,
  getFollowingUsers,
  getConnections,
  requestConnection,
  responseConnection,
  removeConnection,
  getPublicUser,
  getUser,
} from '../controllers/user.controller';
import {addUserValidator, addUserValidatorHandler} from '../validators/user';
import {parseData} from '../utils';
import avatarUpload from '../middlewares/users/avatarUpload';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {
  session: false,
});
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

router.get('/public-users/:id', getPublicUser);
router.get('/:id', requireAuth, getUser);
router.get('/following', requireAuth, getFollowingUsers);
router.get('/connection', requireAuth, getConnections);

router.patch('/:id/request-connection', requireAuth, requestConnection);
router.patch('/:id/response-connection', requireAuth, responseConnection);
router.patch('/:id/remove-connection', requireAuth, removeConnection);
router.patch('/:id/follow', requireAuth, followLimiter, followUser);
router.patch('/:id/unfollow', requireAuth, followLimiter, unfollowUser);

export default router;
