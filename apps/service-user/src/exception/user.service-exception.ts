import { NatsServiceException } from '../../../../libs/microservice/src/exception/nats.service.exception';
import { ServiceUserService } from '../service-user.service';

export class UserServiceException {
  static findOne(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceUserService.name,
      internalErrorMessage: `사용자 상세 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }
  static create(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceUserService.name,
      internalErrorMessage: `사용자 등록 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static edit(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceUserService.name,
      internalErrorMessage: `사용자 수정 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
