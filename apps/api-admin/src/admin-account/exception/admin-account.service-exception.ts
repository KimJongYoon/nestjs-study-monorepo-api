import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { AdminAccountService } from '../admin-account.service';

export class AdminAccountServiceException {
  static create(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminAccountService.name,
      internalErrorMessage: `관리자 계정 등록 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static edit(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminAccountService.name,
      internalErrorMessage: `관리자 계정 정보 수정 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
