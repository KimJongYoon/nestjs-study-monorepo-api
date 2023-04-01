import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class NatsLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return NatsLoggingInterceptor.printLog(context, next);
  }

  /**
   * 로그 출력
   * @param context
   * @param next
   * @returns
   */
  static printLog(context: ExecutionContext, next?: CallHandler) {
    this.printRequestLog(context);

    if (!next) return undefined;

    return this.printResponseLog(context, next);
  }

  /**
   * 요청 로그 출력
   * @param context
   */
  static printRequestLog(context: ExecutionContext) {
    const body = context.getArgs()[0];
    const ctx = context.getArgs()[1];

    // set requestTime
    ctx.requestTime = Date.now();

    const channel = ctx.getSubject();
    const headers = ctx.getHeaders()?.headers;
    const requestId = headers.get('request-id')?.[0];
    const fromApi = headers.get('api-from')?.[0];
    const version = headers.get('api-version')?.[0];
    const headerToArray = Array.from(headers);

    Logger.log(`================ START REQUEST [REQUEST ID: ${requestId}] ================
    FROM : [ ${fromApi} ]
    VERSION : [ ${version} ]
    CHANNEL : [ ${channel} ] 
    HEADERS : [ ${JSON.stringify(headerToArray)} ]
    BODY : [ ${JSON.stringify(body)} ]`);
  }

  /**
   * 응답 로그 출력
   * @param context
   * @param next
   * @returns
   */
  static printResponseLog(context: ExecutionContext, next: CallHandler) {
    const ctx = context.getArgs()[1];

    const channel = ctx.getSubject();
    const headers = ctx.getHeaders()?.headers;
    const requestId = headers.get('request-id')?.[0];
    return next.handle().pipe(
      tap((value) =>
        Logger.log(
          `================ END REQUEST [REQUEST ID: ${requestId}] ${
            Date.now() - ctx.requestTime
          }ms ================ 
            Response : [ ${JSON.stringify(value)} ]`,
        ),
      ),
    );
  }
}
