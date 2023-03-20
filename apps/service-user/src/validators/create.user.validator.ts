import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class CreateUserValidator implements EntityValidator<CreateUserDto> {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}
  async validate(dto: CreateUserDto, optional?: object): Promise<void> {
    // uid 중복 검사
    // email 중복 검사
    // password 검사
    // nickName 중복 검사
  }
}
