import { CorsOptions } from 'cors';
import { logger } from '../utils/logger';

const allowedOrigins = [
  'http://localhost:3000',
  'https://patient-manage.site',
  'https://www.patient-manage.site',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');

    const isAllowed = allowedOrigins.some((allowed) => {
      const normalizedAllowed = allowed
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '');
      return normalizedOrigin === normalizedAllowed;
    });

    if (isAllowed) callback(null, true);
    else {
      logger.error(`🚫 Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 204,
};

export default corsOptions;
