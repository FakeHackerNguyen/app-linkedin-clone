import {Router, Request, Response} from 'express';
import passport from 'passport';
import {login, register} from '../controllers/auth.controller';
import {authLimiter} from '../middlewares/rateLimit';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', {
    failureRedirect: '/api/v1/auth/fail',
  }),
);
// For Mobile
router.post('/login', authLimiter, login);
router.post('/register', authLimiter, register);
// For Web
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/v1/auth/fail',
    session: false,
  }),
  (req: Request, res: Response): void => {
    console.log(req.user);
    res.redirect('/');
  },
);

export default router;
