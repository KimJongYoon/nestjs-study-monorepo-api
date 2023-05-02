import { PickType } from '@nestjs/swagger';
import { AssignHelper } from '../../../../../libs/core/src/helper/assign.helper';
import { ViewUsinPostModel } from '../../../../../libs/database/src/usin';

const allowedKeys: string[] = [
  'id',
  'title',
  'content',
  'thumbnailUrl',
  'createdAt',
];
export class FindOneUsinPostResponse extends PickType(
  ViewUsinPostModel,
  allowedKeys as (keyof ViewUsinPostModel)[],
) {
  constructor(data: ViewUsinPostModel) {
    super();

    const filtered = AssignHelper.filter(data, allowedKeys);
    Object.assign(this, filtered);
  }
}
