import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getHttpStatus(exception);

    const message = this.getMessage(exception);

    const responseBody = {
      statusCode: httpStatus,
      message: message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  /**
   * http 상태 코드 가져오기
   * @param exception
   * @returns
   */
  private getHttpStatus(exception: any) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * 예외 메시지 가져오기
   * @param exception
   * @returns
   */
  private getMessage(exception: any) {
    let message = '';

    const isClassValidatorException = Array.isArray(
      exception?.response?.message,
    );
    if (isClassValidatorException) {
      message = exception.response.message[0];
      Logger.error(message, exception.stack);
    } else {
      message = exception.message;
    }
    return message;
  }
}
