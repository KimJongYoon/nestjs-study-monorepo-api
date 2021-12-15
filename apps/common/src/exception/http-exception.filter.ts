import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    response.status(200).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: `[${response.req.method}] ${response.req.url}`,
    });
  }
}
