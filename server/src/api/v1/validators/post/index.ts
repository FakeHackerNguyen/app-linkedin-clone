import {body, validationResult} from 'express-validator';
import AppError from '../../utils/appError';
import {RequestHandler} from 'express';

const MAX_LENGTH = 3000;

export const postValidator = [
  body('content')
    .isLength({min: 10})
    .withMessage('Your post is too short. Share more of your thoughts!')
    .isLength({max: MAX_LENGTH})
    .withMessage('Post cannot exceed 3000 characters.')
    .trim(),
];

export const commentValidator = [
  body('content')
    .isLength({min: 1})
    .withMessage('Your comment is too short. Share more of your thoughts!')
    .isLength({max: MAX_LENGTH})
    .withMessage('Comment cannot exceed 3000 characters.')
    .trim(),
];

export const addUserValidatorHandler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    const errors = Object.values(mappedErrors).map(error => error.msg);
    const message = `Invalid input data. ${errors.join('. ')}`;
    next(new AppError(message, 400));
  }
};
