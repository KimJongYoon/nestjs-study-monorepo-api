import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AdminJwtGuard } from '../guard/admin-jwt.guard';

export class AdminAuthJwtGuardException {
  static validate(error: any) {
    error.stack = error?.customStack ?? error?.stack;
    Logger.error(error.message, error?.stack, AdminJwtGuard.name);
    if (error?.status) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
    throw new InternalServerErrorException(
      `jwt 인증 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
