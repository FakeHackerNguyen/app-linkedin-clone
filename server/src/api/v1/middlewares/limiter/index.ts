import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit';

const MESSAGE = 'Too many requests, please try again later.';

const createLimiter = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {message: message},
  });
};

export const signUpSignInLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);
export const otpLimiter = createLimiter(5 * 60 * 1000, 1, MESSAGE);
export const searchLimiter = createLimiter(24 * 60 * 60 * 1000, 2500, MESSAGE);
export const createPostLimiter = createLimiter(5 * 60 * 1000, 20, MESSAGE);
export const followLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);
