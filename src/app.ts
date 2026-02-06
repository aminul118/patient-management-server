import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';
import expressSession from 'express-session';
import envVars from './app/config/env';
import corsOptions from './app/config/cors.config';
import './app/config/passport';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import sessionOptions from './app/config/session.config';

const app = express();

app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/v1', router.v1);

// Server Test
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    env: envVars.NODE_ENV,
    message: 'Server running',
    time: new Date(),
  });
});

// Global Error Handle
app.use(globalErrorHandler);
app.use(notFound);

export default app;
