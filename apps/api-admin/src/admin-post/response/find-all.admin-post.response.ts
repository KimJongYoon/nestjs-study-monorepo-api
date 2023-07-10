import { AbstractPickDataResponse } from '../../../../../libs/core/src/response/abstract.pick-data.response';
import { ViewAdminPostModel } from '../../../../../libs/database/src';

const allowedKeys: (keyof ViewAdminPostModel)[] = [
  'id',
  'title',
  'thumbnailUrl',
  'createdAt',
  'remark',
];
export class FindAllAdminPostResponse extends AbstractPickDataResponse(
  ViewAdminPostModel,
  allowedKeys,
) {
  constructor(data: ViewAdminPostModel) {
    super(data);
  }
}
