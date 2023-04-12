import { PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../../libs/database/src/usin';

export class CreateAdminAccountDto extends PickType(AdminAccountModel, [
  'email',
  'password',
  'nickName',
]) {}
