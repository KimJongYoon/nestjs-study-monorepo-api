import { ViewUsinPostModel } from '../../../../../libs/database/src';

export class FindOneViewUsinPostEvent {
  data: ViewUsinPostModel;
  constructor(data: ViewUsinPostModel) {
    this.data = data;
  }
}
