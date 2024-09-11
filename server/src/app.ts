import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/passport';
import globalErrorHandler from './api/v1/controllers/error.controller';

import authRouter from './api/v1/routes/auth.router';

const app = express();

app.disable('x-powered-by');
app.use(
  cors({
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

app.use('/api/v1/auth', authRouter);

app.use('/server', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Server is running',
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

export default app; // module.exports = app;
