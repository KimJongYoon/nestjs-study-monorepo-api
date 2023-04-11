import { HttpStatus } from '@nestjs/common';
import { NatsServiceException } from '../../../../libs/microservice/src/exception/nats.service.exception';
import { ServiceAuthService } from '../service-auth.service';

export class AuthServiceException {
  static validateAccessTokenUsin(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceAuthService.name,
      internalErrorMessage: `JWT 토큰 인증 오류가 발생하였습니다 (${error.message})`,
      httpStatus: HttpStatus.UNAUTHORIZED,
    });
  }
}
