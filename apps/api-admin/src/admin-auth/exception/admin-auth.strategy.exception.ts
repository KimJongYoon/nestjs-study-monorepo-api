import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AdminAccountLoginStrategy } from '../strategy/admin-account-login.strategy';

export class AdminAuthStrategyException {
  static validate(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, AdminAccountLoginStrategy.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `관리자 계정 인증 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
