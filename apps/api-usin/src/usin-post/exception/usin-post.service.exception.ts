import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { UsinPostService } from '../usin-post.service';

export class UsinPostServiceException {
  static findAll(error: any) {
    NatsApiException.exception({
      error,
      serviceName: UsinPostService.name,
      internalErrorMessage: `포스트 목록 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static findOne(error: any) {
    NatsApiException.exception({
      error,
      serviceName: UsinPostService.name,
      internalErrorMessage: `포스트 상세 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
