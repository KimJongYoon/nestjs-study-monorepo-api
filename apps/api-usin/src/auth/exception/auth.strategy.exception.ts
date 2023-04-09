import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsinLoginStrategy } from '../strategy/usin-login.strategy';

export class AuthStrategyException {
  static validate(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UsinLoginStrategy.name);
    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(
      `사용자 인증 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
