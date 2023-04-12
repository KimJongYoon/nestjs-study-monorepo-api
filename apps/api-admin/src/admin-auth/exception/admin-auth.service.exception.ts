import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { AdminAuthService } from '../admin-auth.service';

export class AdminAuthServiceException {
  static signIn(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminAuthService.name,
      internalErrorMessage: `사용자 JWT 발급 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
