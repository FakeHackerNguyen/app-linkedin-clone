import {Router} from 'express';
import {getJobTitles, getLocations} from '../controllers/external.controller';
import {searchLimiter} from '../middlewares/limiter';

const router = Router();

router.get('/location', searchLimiter, getLocations);
router.get('/job-title', searchLimiter, getJobTitles);
export default router;
