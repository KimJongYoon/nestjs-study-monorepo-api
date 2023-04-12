import { PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../libs/database/src';

export class SignInAdminAccountDto extends PickType(AdminAccountModel, [
  'email',
  'password',
]) {}
