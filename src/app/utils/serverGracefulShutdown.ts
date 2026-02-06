import { Server } from 'http';
import { logger } from './logger';

const serverGracefulShutdown = (server: Server) => {
  const shutdown = (reason: string, err?: unknown) => {
    logger.info(
      `⚠️  ${reason} --> Server shutting down gracefully.`,
      err || '',
    );

    if (server) {
      server.close(() => {
        logger.info('🔻 Server closed.');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM signal received'));
  process.on('SIGINT', () => shutdown('SIGINT signal received'));
  process.on('unhandledRejection', (err) =>
    shutdown('Unhandled Rejection detected', err),
  );
  process.on('uncaughtException', (err) =>
    shutdown('Uncaught Exception detected', err),
  );
};

export default serverGracefulShutdown;
