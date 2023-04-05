import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { UserValidatorException } from '../exception/user.validator-exception';

@Injectable()
export class CommonUserValidator {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * uid 중복 검사
   * @param dto
   */
  async validateUid(uid: string) {
    const savedUserByUid = await this.usinDatabaseService.user.findFirst({
      where: { uid: uid, deletedAt: null },
    });

    if (savedUserByUid) {
      UserValidatorException.validateUid(uid);
    }
  }

  /**
   * 닉네임 중복 검사
   * @param dto
   */
  async validateNickName(nickName: string) {
    const savedUserByNickName = await this.usinDatabaseService.user.findFirst({
      where: { nickName: nickName, deletedAt: null },
    });

    if (savedUserByNickName) {
      UserValidatorException.validateNickName(nickName);
    }
  }

  /**
   * 이메일 중복 검사
   * @param dto
   */
  async validateEmail(email: string) {
    const savedUserByEmail = await this.usinDatabaseService.user.findFirst({
      where: { email: email, deletedAt: null },
    });

    if (savedUserByEmail) {
      UserValidatorException.validateEmail(email);
    }
  }
}
