import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsinUserService } from '../usin-user.service';

export class UsinUserServiceException {
  static findOne(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UsinUserService.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 상세 조회 작업 중 오류가 발생 하였습니다.`,
    );
  }

  static create(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UsinUserService.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 등록 작업 중 오류가 발생 하였습니다.`,
    );
  }

  static edit(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UsinUserService.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 수정 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
