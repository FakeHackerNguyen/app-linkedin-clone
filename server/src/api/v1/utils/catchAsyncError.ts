import {Request, Response, NextFunction} from 'express';
import {CustomRequest} from '../interfaces';

function catchAsyncError(
  cb: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    cb(req, res, next).catch(next);
  };
}

export default catchAsyncError;
