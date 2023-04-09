import { PartialType, PickType } from '@nestjs/swagger';
import { UserModel } from '../../../../../libs/database/src';

export class EditUserDto extends PickType(PartialType(UserModel), [
  'nickName',
  'password',
  'email',
]) {}
