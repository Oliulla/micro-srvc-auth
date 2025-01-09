import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as WinstonDailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    // Configure the logger with daily log rotation
    this.logger = winston.createLogger({
      level: 'info', // Default log level, can be adjusted
      transports: [
        new WinstonDailyRotateFile({
          filename: 'logs/%DATE%-request.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '1g', // Updated max size to 1GB
          maxFiles: '14d', // Keep logs for 14 days
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
