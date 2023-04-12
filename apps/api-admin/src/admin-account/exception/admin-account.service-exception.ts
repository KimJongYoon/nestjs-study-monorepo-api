import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AdminAccountService } from '../admin-account.service';

export class AdminAccountServiceException {
  static create(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, AdminAccountService.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 등록 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
