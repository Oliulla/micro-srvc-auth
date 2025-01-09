import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

// Extend dayjs with timezone and utc plugins
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  private getBangladeshTimestamp(): string {
    // Get the current time in Bangladesh timezone
    const bangladeshTime = dayjs().tz('Asia/Dhaka');

    // Format the date and time to 12-hour format with AM/PM
    const formattedTimestamp = bangladeshTime.format('DD/MM/YYYY, hh:mm:ss A');

    return formattedTimestamp;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body, query } = request;
    const start = Date.now();
    const timestamp = this.getBangladeshTimestamp(); // Get Bangladesh time

    // Logging request details with alternative separators
    this.logger.log(
      `\n>>> REQUEST START >>>\n[${timestamp}] HTTP ${method} ${url}\n` +
        `Body: ${JSON.stringify(body)}\n` +
        `Query: ${JSON.stringify(query)}\n` +
        `Headers: ${JSON.stringify(headers)}\n` +
        `<<< REQUEST END <<<\n`,
    );

    return next.handle().pipe(
      tap((response: any) => {
        const delay = Date.now() - start;
        const statusCode = response?.statusCode ?? 'N/A'; // Default to 'N/A' if no statusCode exists
        const timestamp = this.getBangladeshTimestamp(); // Get Bangladesh time

        // Logging response details with alternative separators
        this.logger.log(
          `\n>>> RESPONSE START >>>\n[${timestamp}] HTTP ${method} ${url}\n` +
            `Status: ${statusCode}\n` +
            `Response Time: ${delay}ms\n` +
            `<<< RESPONSE END <<<\n`,
        );
      }),
    );
  }
}
