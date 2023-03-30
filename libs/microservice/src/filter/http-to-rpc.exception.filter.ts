import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { throwError } from 'rxjs';

/**
 * 마이크로서비스에서 발생한 HttpException을 RpcException으로 변발
 */
@Catch(HttpException)
export class HttpToRpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return throwError(() => {
      const error: HttpException = exception;
      error['customStack'] = exception.stack.toString();

      return error;
    });
  }
}
