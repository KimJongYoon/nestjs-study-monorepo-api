import { PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../../libs/database/src';

export class AdminLoginAuthDto extends PickType(AdminAccountModel, [
  'email',
  'password',
]) {}
