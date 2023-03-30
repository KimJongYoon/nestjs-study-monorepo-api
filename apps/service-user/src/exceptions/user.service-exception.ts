import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ServiceUserService } from '../service-user.service';

export class UserServiceException {
  static create(error: any) {
    if (error instanceof BadRequestException) throw error;
    Logger.error(error, error?.stack, ServiceUserService.name);
    throw new InternalServerErrorException(
      `사용자 등록 작업 중 오류가 발생 하였습니다.`,
    );
  }
}
