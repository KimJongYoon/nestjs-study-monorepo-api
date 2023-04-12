import { PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../libs/database/src';

export class ValidateAdminAccountDto extends PickType(AdminAccountModel, [
  'email',
  'password',
]) {}
