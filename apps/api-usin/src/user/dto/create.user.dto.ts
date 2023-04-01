import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../../../../libs/microservice/src';

export class CreateUserDto extends PickType(UserModel, [
  'uid',
  'email',
  'password',
  'nickName',
]) {}
