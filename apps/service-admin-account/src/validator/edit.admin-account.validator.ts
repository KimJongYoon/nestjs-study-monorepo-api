import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { EditAdminAccountDto } from '../dto/edit.admin-account.dto';
import { CommonAdminAccountValidator } from './common.admin-account.validator';

@Injectable()
export class EditAdminAccountValidator
  implements EntityValidator<EditAdminAccountDto>
{
  constructor(
    private readonly commonAdminAccountValidator: CommonAdminAccountValidator,
  ) {}
  async validate(dto: EditAdminAccountDto, optional?: object): Promise<void> {
    // nickName 중복 검사
    await this.commonAdminAccountValidator.validateNickName(
      dto.nickName,
      dto.email,
    );
  }
}
