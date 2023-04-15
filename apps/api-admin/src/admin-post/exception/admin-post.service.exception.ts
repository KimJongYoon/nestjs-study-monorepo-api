import { NatsApiException } from '../../../../../libs/microservice/src/exception/nats.api.exception';
import { AdminPostService } from '../admin-post.service';

export class AdminPostServiceException {
  static findAll(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 목록 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static findOne(error: any, id: string) {
    NatsApiException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 상세 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static create(error: any) {
    NatsApiException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 등록 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static edit(error: any, id: string) {
    NatsApiException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 수정 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static remove(error: any, id: string) {
    NatsApiException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 삭제 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
