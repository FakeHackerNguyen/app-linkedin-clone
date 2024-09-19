import winston from 'winston';
import 'winston-daily-rotate-file';

const {combine, timestamp, printf} = winston.format;

export default class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        printf(
          ({level, timestamp, message, context, requestId, metadata}) =>
            `${timestamp}: ${level}: ${context}: ${requestId}: ${message}: ${JSON.stringify(metadata)}`,
        ),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          dirname: 'src/api/v1/logs',
          level: 'info',
          filename: 'application-%DATE%.info.log',
          datePattern: 'YYYY-MM-DD-HH-MM-SS',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            printf(
              ({level, timestamp, message, context, requestId, metadata}) =>
                `${timestamp}: ${level}: ${context}: ${requestId}: ${message}: ${JSON.stringify(metadata)}`,
            ),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: 'src/api/v1/logs',
          level: 'error',
          filename: 'application-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD-HH-MM-SS',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            printf(
              ({level, timestamp, message, context, requestId, metadata}) =>
                `${timestamp}: ${level}: ${context}: ${requestId}: ${message}: ${JSON.stringify(metadata)}`,
            ),
          ),
        }),
      ],
    });
  }

  public info(message: string, params: object) {
    const logObject = Object.assign({message}, params);
    this.logger.info(logObject);
  }

  public error(message: string, params: object) {
    const logObject = Object.assign({message}, params);
    this.logger.error(logObject);
  }
}
