import { Injectable } from '@nestjs/common';
import { AdminAccountValidatorException } from '../exception/admin-account.validator-exception';
import { ServiceAdminAccountRepository } from '../repository/service-admin-account.repository';

@Injectable()
export class CommonAdminAccountValidator {
  constructor(
    private readonly serviceAdminAccountRepository: ServiceAdminAccountRepository,
  ) {}

  /**
   * 닉네임 중복 검사
   * @param dto
   */
  async validateNickName(nickName: string, editRequestAdminEmail?: string) {
    if (!nickName) return;
    const savedUserByNickName =
      await this.serviceAdminAccountRepository.findOneByNickName(nickName);

    const isNotRequestUser =
      savedUserByNickName?.email !== editRequestAdminEmail;
    if (savedUserByNickName && isNotRequestUser) {
      AdminAccountValidatorException.validateNickName(nickName);
    }
  }

  /**
   * 이메일 중복 검사
   * @param dto
   */
  async validateEmail(email: string, editRequestAdminEmail?: string) {
    if (!email) return;
    const savedUserByEmail =
      await this.serviceAdminAccountRepository.findOneByEmail(email);

    const isNotRequestUser = savedUserByEmail?.email !== editRequestAdminEmail;
    if (savedUserByEmail && isNotRequestUser) {
      AdminAccountValidatorException.validateEmail(email);
    }
  }
}
