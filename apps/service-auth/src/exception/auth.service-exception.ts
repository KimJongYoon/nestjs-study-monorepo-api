import { HttpStatus } from '@nestjs/common';
import { NatsServiceException } from '../../../../libs/microservice/src/exception/nats.service.exception';
import { ServiceUserAuthService } from '../service/service-auth.service';

export class AuthServiceException {
  static validateAccessToken(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceUserAuthService.name,
      internalErrorMessage: `JWT 토큰 인증 오류가 발생하였습니다 (${error.message})`,
      httpStatus: HttpStatus.UNAUTHORIZED,
    });
  }
}
