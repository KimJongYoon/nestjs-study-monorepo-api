import { PartialType, PickType } from '@nestjs/swagger';
import { AdminAccountModel } from '../../../../../libs/database/src/usin';

export class EditAdminAccountDto extends PickType(
  PartialType(AdminAccountModel),
  ['nickName', 'password', 'remark'],
) {}
