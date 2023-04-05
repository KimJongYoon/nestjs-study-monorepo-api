import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user.service';

export class UserServiceException {
  static create(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UserService.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 등록 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
