import { BadRequestException, Logger } from '@nestjs/common';
import { CreateUserValidator } from '../validator/create.user.validator';

export class UserValidatorException {
  /**
   * uid 유효성 검사 예외
   * @param uid
   */
  static validateUid(uid: string) {
    const message = `uid: ${uid} is already exist`;
    Logger.error(message, CreateUserValidator.name);
    throw new BadRequestException(message);
  }

  /**
   * nickName 유효성 검사 예외
   * @param nickName
   */
  static validateNickName(nickName: string) {
    const message = `nickName: ${nickName} is already exist`;
    Logger.error(message, CreateUserValidator.name);
    throw new BadRequestException(message);
  }

  /**
   * email 유효성 검사 예외
   * @param email
   */
  static validateEmail(email: string) {
    const message = `email: ${email} is already exist`;
    Logger.error(message, CreateUserValidator.name);
    throw new BadRequestException(message);
  }
}
