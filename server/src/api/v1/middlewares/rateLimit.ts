import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit';
import {Request, Response, NextFunction} from 'express';
import AppError from '../utils/appError';

function createMessage(windowMs: number): string {
  const convertToMinutes = windowMs / 60000;
  if (convertToMinutes >= 60)
    return `Too many requests from this IP, please try again in ${Math.floor(convertToMinutes / 60)} hour!`;
  else if (convertToMinutes < 60)
    return `Too many requests from this IP, please try again in ${Math.floor(convertToMinutes)} minutes!`;
  return 'Something went wrong!';
}

function createLimiter(
  windowMs: number,
  limit: number,
): RateLimitRequestHandler {
  const message = createMessage(windowMs);

  return rateLimit({
    windowMs,
    limit,
    message,
    handler: (req: Request, res: Response, next: NextFunction): void => {
      return next(new AppError(message, 429));
    },
  });
}

export const authLimiter = createLimiter(60 * 60 * 1000, 50);
