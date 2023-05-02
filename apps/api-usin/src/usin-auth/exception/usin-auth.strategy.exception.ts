import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { UsinLoginStrategy } from '../strategy/usin-login.strategy';

export class UsinAuthStrategyException {
  static validate(error: any) {
    NatsApiException.exception({
      error,
      serviceName: UsinLoginStrategy.name,
      internalErrorMessage: `사용자 인증 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
