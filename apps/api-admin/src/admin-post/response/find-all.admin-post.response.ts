import { PickType } from '@nestjs/swagger';
import { AssignHelper } from '../../../../../libs/core/src/helper/assign.helper';
import { ViewAdminPostModel } from '../../../../../libs/database/src';

const allowedKeys: string[] = [
  'id',
  'title',
  'thumbnailUrl',
  'createdAt',
  'remark',
];
export class FindAllAdminPostResponse extends PickType(
  ViewAdminPostModel,
  allowedKeys as (keyof ViewAdminPostModel)[],
) {
  constructor(data: ViewAdminPostModel) {
    super();

    const filtered = AssignHelper.filter(data, allowedKeys);
    Object.assign(this, filtered);
  }
}
