import { Injectable } from '@nestjs/common';
import { UserValidatorException } from '../exception/user.validator-exception';
import { ServiceUserRepository } from '../repository/service-user.repository';

@Injectable()
export class CommonUserValidator {
  constructor(private readonly serviceUserRepository: ServiceUserRepository) {}

  /**
   * uid 중복 검사
   * @param dto
   */
  async validateUid(uid: string) {
    if(!uid) return;
    const savedUserByUid = await this.serviceUserRepository.findOneByUid(uid);

    if (savedUserByUid) {
      UserValidatorException.validateUid(uid);
    }
  }

  /**
   * 닉네임 중복 검사
   * @param dto
   */
  async validateNickName(nickName: string, editRequestUid?: string) {
    if(!nickName) return;
    const savedUserByNickName =
      await this.serviceUserRepository.findOneByNickName(nickName);

    const isNotRequestUser = savedUserByNickName?.uid !== editRequestUid;
    if (savedUserByNickName && isNotRequestUser) {
      UserValidatorException.validateNickName(nickName);
    }
  }

  /**
   * 이메일 중복 검사
   * @param dto
   */
  async validateEmail(email: string, editRequestUid?: string) {
    if(!email) return;
    const savedUserByEmail = await this.serviceUserRepository.findOneByEmail(
      email,
    );

    const isNotRequestUser = savedUserByEmail?.uid !== editRequestUid;
    if (savedUserByEmail && isNotRequestUser) {
      UserValidatorException.validateEmail(email);
    }
  }
}
