import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/passport';
import globalErrorHandler from './api/v1/controllers/error.controller';

import authRouter from './api/v1/routes/auth.route';
import userRouter from './api/v1/routes/user.route';
import pageRouter from './api/v1/routes/page.route';
import externalRouter from './api/v1/routes/external.route';
import searchRouter from './api/v1/routes/search.route';
import postRouter from './api/v1/routes/post.route';

const app: Express = express();

app.disable('x-powered-by');
app.use(
  cors({
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

app.use('/api/v1/auths', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/pages', pageRouter);
app.use('/api/v1/externals', externalRouter);
app.use('/api/v1/searchs', searchRouter);
app.use('/api/v1/posts', postRouter);

app.use('/server', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Server is running',
  });
});

app.all('*', (req: Request, res: Response, _: NextFunction): void => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

export default app; // module.exports = app;
