import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsinJwtGuard } from '../guard/usin-jwt.guard';

export class AuthJwtGuardException {
  static validate(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, UsinJwtGuard.name);
    if (error?.status) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
    throw new InternalServerErrorException(
      `jwt 인증 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
