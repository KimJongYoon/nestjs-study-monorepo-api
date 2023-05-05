import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { AdminAccountLoginStrategy } from '../strategy/admin-account-login.strategy';

export class AdminAuthStrategyException {
  static validate(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminAccountLoginStrategy.name,
      internalErrorMessage: `관리자 계정 인증 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
