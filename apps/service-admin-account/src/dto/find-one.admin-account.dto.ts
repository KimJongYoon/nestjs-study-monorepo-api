import { PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../libs/database/src';

export class FindOneAdminAccountDto extends PickType(AdminAccountModel, [
  'email',
]) {}
