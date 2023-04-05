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
}
