import { NatsServiceException } from '../../../../libs/microservice/src/exception/nats.service.exception';
import { ServiceAdminAccountService } from '../service-admin-account.service';

export class AdminAccountServiceException {
  static findOne(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceAdminAccountService.name,
      internalErrorMessage: `관리자 계정 상세 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static create(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: ServiceAdminAccountService.name,
      internalErrorMessage: `관리자 계정 등록 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
