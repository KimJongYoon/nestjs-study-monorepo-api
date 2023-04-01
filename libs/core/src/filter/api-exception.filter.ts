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
export class ApiExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
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

    this.printExceptionLog(host, message);

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

  /**
   * 예외 로그 출력
   * @param host
   * @param message
   */
  private printExceptionLog(host: ArgumentsHost, message: string) {
    const requestId = host.getArgs()?.[0]?.requestId;
    const requestTime = host.getArgs()?.[0]?.requestTime;
    Logger.error(
      `================ EXCEPTION REQUEST [REQUEST ID: ${requestId}] ${
        Date.now() - requestTime
      }ms ================ 
  Message: ${message}
`,
      ApiExceptionsFilter.name,
    );
  }
}
