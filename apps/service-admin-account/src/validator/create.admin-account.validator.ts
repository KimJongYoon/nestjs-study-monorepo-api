import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { CreateAdminAccountDto } from '../dto/create.admin-account.dto';
import { CommonAdminAccountValidator } from './common.admin-account.validator';

@Injectable()
export class CreateAdminAccountValidator
  implements EntityValidator<CreateAdminAccountDto>
{
  constructor(
    private readonly commonAdminAccountValidator: CommonAdminAccountValidator,
  ) {}
  async validate(dto: CreateAdminAccountDto, optional?: object): Promise<void> {
    // email 중복 검사
    await this.commonAdminAccountValidator.validateEmail(dto.email);

    // nickName 중복 검사
    await this.commonAdminAccountValidator.validateNickName(dto.nickName);
  }
}
