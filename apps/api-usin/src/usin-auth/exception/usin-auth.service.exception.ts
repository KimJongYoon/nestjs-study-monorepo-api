import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { UsinAuthService } from '../usin-auth.service';

export class UsinAuthServiceException {
  static signIn(error: any) {
    NatsApiException.exception({
      error,
      serviceName: UsinAuthService.name,
      internalErrorMessage: `사용자 JWT 발급 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
