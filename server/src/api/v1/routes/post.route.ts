import {Router} from 'express';
import {createPostLimiter} from '../middlewares/limiter';
import fileUpload from '../middlewares/post/fileUpload';
import {createPost} from '../controllers/post.controller';
import {postValidator} from '../validators/post';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {
  session: false,
});
const router = Router();

router.use(requireAuth);

router.post('/', createPostLimiter, fileUpload, postValidator, createPost);
export default router;
