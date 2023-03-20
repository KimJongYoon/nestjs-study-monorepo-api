import { IsString } from 'class-validator';
import { EntityBuilder, EntityValidator } from '../../../../libs/core/src';
import { User } from '../../../../libs/database/src';

export class CreateUserDto implements EntityBuilder<Partial<User>> {
  @IsString()
  uid: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickName: string;

  async build(optional?: object): Promise<Partial<User>> {
    return { ...this };
  }
  async validate(
    validator: EntityValidator<any>,
    optional?: object,
  ): Promise<this> {
    await validator.validate(this);
    return this;
  }
}
