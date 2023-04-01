import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return LoggingInterceptor.printLog(context, next);
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
    const requestId = Math.round(Math.random() * 100000000);
    const incomingMessage = context.getArgs()[0];
    const remoteIP = incomingMessage.connection.remoteAddress;
    const jwt =
      context
        .switchToHttp()
        .getRequest()
        .headers?.authorization?.split('Bearer ')[1] ?? '';

    incomingMessage.requestId = requestId;
    incomingMessage.requestTime = Date.now();

    Logger.log(`================ START REQUEST [REQUEST ID: ${requestId}] ================
    REMOTE IP: [ ${remoteIP} ]
    URL : [ ${incomingMessage?.url} ] 
    METHOD : [ ${incomingMessage?.method} ]
    HEADER UID : [ ${JSON.stringify(incomingMessage?.headers)} ]
    JWT : [ ${jwt} ]  
    QUERY : [ ${JSON.stringify(incomingMessage?.query)} ]
    PARAMS : [ ${JSON.stringify(incomingMessage?.params)} ]
    BODY : [ ${JSON.stringify(incomingMessage?.body)} ]`);
  }

  /**
   * 응답 로그 출력
   * @param context
   * @param next
   * @returns
   */
  static printResponseLog(context: ExecutionContext, next: CallHandler) {
    const incomingMessage = context.getArgs()[0];
    return next.handle().pipe(
      tap((value) =>
        Logger.log(
          `================ END REQUEST [REQUEST ID: ${
            incomingMessage.requestId
          }] ${Date.now() - incomingMessage.requestTime}ms ================
            Response : [ ${JSON.stringify(value)} ]`,
        ),
      ),
    );
  }
}
