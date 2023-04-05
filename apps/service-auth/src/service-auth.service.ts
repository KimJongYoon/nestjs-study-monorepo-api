import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptHelper } from '../../../libs/core/src';
import { UsinDatabaseService } from '../../../libs/database/src';
import { ValidateUsinDto } from './dto/validate.usin.dto';

@Injectable()
export class ServiceAuthService {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 사용자 인증(실패 시 401 에러)
   * @param uid
   * @param password
   * @returns
   */
  async validateUsin(dto: ValidateUsinDto): Promise<any> {
    const { uid, password } = dto;

    const user = await this.usinDatabaseService.user.findUnique({
      where: {
        uid: uid,
      },
    });

    const isNotExist = !user;
    if (isNotExist) {
      throw new UnauthorizedException('User not found.');
    }

    const invalidPassword = !BcryptHelper.compare(password, user?.password);
    if (invalidPassword) {
      throw new UnauthorizedException('Invalid password.');
    }

    const { password: notUsedField, ...result } = user;
    return result;
  }
}
