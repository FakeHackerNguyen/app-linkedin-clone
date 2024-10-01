import {Router} from 'express';
import {
  getCompanies,
  getJobTitles,
  getLocations,
  getUniversities,
} from '../controllers/external.controller';
import {searchLimiter} from '../middlewares/limiter';

const router = Router();

router.get('/location', searchLimiter, getLocations);
router.get('/job-title', searchLimiter, getJobTitles);
router.get('/university', searchLimiter, getUniversities);
router.get('/company', searchLimiter, getCompanies);
export default router;
