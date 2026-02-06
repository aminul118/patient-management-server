import type { SessionOptions } from 'express-session';
import envVars from './env';

const isProd = envVars.NODE_ENV === 'production';

const sessionOptions: SessionOptions = {
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  },
};

export default sessionOptions;
