import AppError from '../utils/appError';
import {NextFunction, Request, Response, ErrorRequestHandler} from 'express';
// import Logger from '../utils/logger';
// const logger = new Logger();
interface ValidationError {
  message: string;
}

interface ErrorWithErrors extends Error {
  errors: Record<string, ValidationError>;
}

const handleCastErrorDB: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): AppError => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// const handleValidationErrorDB = (err) => {
//     const errors = Object.values(err.errors).map((el) => el.message);

//     const message = `Invalid input data. ${errors.join(". ")}`;
//     return new AppError(message, 400);
//   };

const handleValidationErrorDB: ErrorRequestHandler = (err, req, res, next) => {
  // Type guard to ensure the error has the expected structure
  const errorWithErrors = err as ErrorWithErrors;
  const errors = Object.values(errorWithErrors.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev: ErrorRequestHandler = (err, req, res, next) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      data: {
        error: err,
        message: err.message,
        stack: err.stack,
      },
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd: ErrorRequestHandler = (err, req, res, next) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        data: {
          message: err.message,
        },
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      data: {
        message: 'Something went very wrong!',
      },
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // logger.error(err.message, {
  //   timestamp: Date.now(),
  //   level: 'error',
  //   metadata: err,
  // });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res, next);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err};
    error.message = err.message;

    if (error.name === 'CastError')
      error = handleCastErrorDB(error, req, res, next);
    if (error.code === 11000)
      error = handleDuplicateFieldsDB(error, req, res, next);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error, req, res, next);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res, next);
  }
};

export default globalErrorHandler;
