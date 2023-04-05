import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { CreateUserDto } from '../dto/create.user.dto';
import { CommonUserValidator } from './common.user.validator';

@Injectable()
export class CreateUserValidator implements EntityValidator<CreateUserDto> {
  constructor(private readonly commonUserValidator: CommonUserValidator) {}

  async validate(dto: CreateUserDto, optional?: object): Promise<void> {
    // uid 중복 검사
    await this.commonUserValidator.validateUid(dto.uid);

    // nickName 중복 검사
    await this.commonUserValidator.validateNickName(dto.nickName);

    // email 중복 검사
    await this.commonUserValidator.validateEmail(dto.email);
  }
}
