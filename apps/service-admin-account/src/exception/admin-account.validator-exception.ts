import { BadRequestException, Logger } from '@nestjs/common';
import { error } from 'console';
import { NatsServiceException } from '../../../../libs/microservice/src/exception/nats.service.exception';
import { CommonAdminAccountValidator } from '../validator/common.admin-account.validator';

export class AdminAccountValidatorException {
  /**
   * nickName 유효성 검사 예외
   * @param nickName
   */
  static validateNickName(nickName: string) {
    NatsServiceException.exception({
      error,
      serviceName: CommonAdminAccountValidator.name,
      internalErrorMessage: `nickName: ${nickName} is already exist`,
    });
  }

  /**
   * email 유효성 검사 예외
   * @param email
   */
  static validateEmail(email: string) {
    const message = `email: ${email} is already exist`;
    Logger.error(message, CommonAdminAccountValidator.name);
    throw new BadRequestException(message);
  }
}
