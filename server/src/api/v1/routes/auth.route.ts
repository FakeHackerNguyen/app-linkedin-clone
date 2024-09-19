import {Router} from 'express';
import passport from 'passport';
import {getUserProfile} from '../controllers/auth.controller';

const router = Router();

const requireAuth = passport.authenticate('jwt', {
  session: false,
});

// const requireAuthGoogle = passport.authenticate('google', {
//   failureRedirect: '/api/v1/auth/fail',
//   session: false,
// });

router.get('/', requireAuth, getUserProfile);
// For Mobile

// For Web
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

// router.get(
//   '/google/callback',
//   requireAuthGoogle,
//   (req: Request, res: Response): void => {
//     res.redirect('/');
//   },
// );

export default router;
