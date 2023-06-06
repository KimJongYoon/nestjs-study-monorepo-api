import { HttpStatus } from '@nestjs/common';
import { NatsServiceException } from '../../../../../libs/microservice/src/exception/nats.service.exception';
import { AdminPostService } from '../admin-post.service';

export class AdminPostServiceException {
  static findAll(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 목록 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static findOne(error: any, id: string) {
    if (error?.name === 'NotFoundError') {
      AdminPostServiceException.findOneNotFound(error, id);
    }

    NatsServiceException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 상세 조회 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static findOneNotFound(error: any, id: string) {
    NatsServiceException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 정보는 존재하지 않습니다.`,
      httpStatus: HttpStatus.NOT_FOUND,
    });
  }

  static create(error: any) {
    NatsServiceException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 등록 작업 중 오류가 발생 하였습니다.`,
    });
  }

  static edit(error: any, id: string) {
    NatsServiceException.exception({
      error,
      serviceName: AdminPostService.name,
      internalErrorMessage: `포스트 ID[${id}] 수정 작업 중 오류가 발생 하였습니다.`,
    });
  }
}
