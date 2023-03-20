import { EntityValidator } from './entity.validator';

export interface EntityBuilder<T> {
  build(optional?: object): Promise<T>;
  validate(validator: EntityValidator<any>, optional?: object): Promise<this>;
}
