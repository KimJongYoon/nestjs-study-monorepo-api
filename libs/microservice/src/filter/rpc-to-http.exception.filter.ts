import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { NatsHeaderEnum } from '../enum/nats.header.enum';

/**
 * 마이크로서비스에서 발생한 HttpException을 RpcException으로 변발
 */
@Catch(HttpException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return throwError(() => {
      const error: HttpException = exception;
      error['customStack'] = exception.stack.toString();
      error.message = this.getMessage(exception);

      this.printExceptionLog(host, error);
      return error;
    });
  }

  private printExceptionLog(host: ArgumentsHost, error: HttpException) {
    const ctx = host.getArgs()[1];
    const headers = ctx.getHeaders()?.headers;
    const requestId = headers.get(NatsHeaderEnum.REQUEST_ID)?.[0];
    Logger.error(
      `================ EXCEPTION REQUEST [REQUEST ID: ${requestId}] ${
        Date.now() - ctx.requestTime
      }ms ================
  Message: ${error?.message} 
`,
      RpcToHttpExceptionFilter.name,
    );
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
