import {check, validationResult} from 'express-validator';
import AppError from '../../utils/appError';
import {RequestHandler} from 'express';

export const addUserValidator = [
  check('firstName')
    .isLength({min: 1})
    .withMessage('First name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('First name must not contain anything other than alphabet')
    .custom((value, {req}) => {
      switch (true) {
        case value.length === 1:
          throw new Error('First name must be at least 2 characters long');
        case value.length > 20:
          throw new Error('First name cannot be more than 20 characters long');
        default:
          return true;
      }
    })
    .trim(),
  check('lastName')
    .isLength({min: 1})
    .withMessage('Last name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('Last name must not contain anything other than alphabet')
    .custom(value => {
      switch (true) {
        case value.length === 1:
          throw new Error('Last name must be at least 2 characters long');
        case value.length > 20:
          throw new Error('Last name cannot be more than 20 characters long');
        default:
          return true;
      }
    })
    .trim(),
  check('email').isEmail().withMessage('Invalid email address').trim(),
  check('password')
    .isLength({min: 6})
    .withMessage('Please enter a password with 6 or more characters'),
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
