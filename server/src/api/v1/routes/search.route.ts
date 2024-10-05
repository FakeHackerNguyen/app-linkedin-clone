import {Router} from 'express';
import {searchLimiter} from '../middlewares/limiter';
import {
  searchCommon,
  searchCompany,
  searchUniversity,
} from '../controllers/search.controller';

const router = Router();

router.get('/common', searchLimiter, searchCommon);
router.get('/company', searchLimiter, searchCompany);
router.get('/university', searchLimiter, searchUniversity);

export default router;
