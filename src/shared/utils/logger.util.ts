import winston from 'winston';

/* Logger service Wrapper. */
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      options: {
        createDirectory: true,
        flags: 'a',
      },
    }),
    new winston.transports.File({
      filename: 'logs/logs.log',
      level: 'info',
      options: {
        createDirectory: true,
        flags: 'a',
      },
    }),
  ],
});

const consoleLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: 'silly' /* error, warn, info, verbose, debug & silly logs will be logged to console. */,
    }),
  ],
});

/**
 * Logger service that log any any error, info or warnings.
 */
export class Logger {
  /**
   * error() method to log error stack to the logs 'logs/errors.log' file.
   * @param msg the error massage.
   * @param err The Error object to log its stack if it was an exception.
   */
  public static error(msg: string, err?: Error): void {
    const meta = { stack: err ? err.stack : '' };
    logger.error(msg, meta);
  }

  /**
   * info() method to log info logs to the logs 'logs/logs.log' file.
   * @param msg the error massage.
   * @param meta An optional additional info data.
   * @param logToConsole Makes sure if it safe to log this info to the console.
   */
  public static info(msg: string, meta?: unknown, logToConsole?: boolean): void {
    logger.info(msg, meta);
    if (logToConsole) {
      consoleLogger.info(msg, meta);
    }
  }
}
