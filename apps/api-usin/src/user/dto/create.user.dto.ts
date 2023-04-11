import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../../../../libs/database/src/usin/models/user/user.model';

export class CreateUserDto extends PickType(UserModel, [
  'uid',
  'email',
  'password',
  'nickName',
]) {}
