import {Request, Response, NextFunction} from 'express';

function catchAsyncError(
  cb: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    cb(req, res, next).catch(next);
  };
}

export default catchAsyncError;
