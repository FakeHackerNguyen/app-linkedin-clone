import {Router} from 'express';
import {getLocations} from '../controllers/external.controller';
import {locationLimiter} from '../middlewares/limiter';

const router = Router();

router.get('/location', locationLimiter, getLocations);

export default router;
