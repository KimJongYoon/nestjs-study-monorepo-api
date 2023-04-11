import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { EditUserDto } from '../dto/edit.user.dto';
import { CommonUserValidator } from './common.user.validator';

@Injectable()
export class EditUserValidator implements EntityValidator<EditUserDto> {
  constructor(private readonly commonUserValidator: CommonUserValidator) {}

  async validate(dto: EditUserDto): Promise<void> {
    // nickName 중복 검사
    await this.commonUserValidator.validateNickName(dto.nickName);

    // email 중복 검사
    await this.commonUserValidator.validateEmail(dto.email);
  }
}
