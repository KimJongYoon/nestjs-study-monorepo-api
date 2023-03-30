import { PickType } from '@nestjs/swagger';
import {
  BcryptHelper,
  EntityBuilder,
  EntityValidator,
} from '../../../core/src';
import { Prisma } from '../../../database/src';
import { UserModel } from '../models/user/user.model';

export class CreateUserDto
  extends PickType(UserModel, ['uid', 'email', 'password', 'nickName'])
  implements EntityBuilder<Prisma.UserCreateInput>
{
  async build(optional?: object): Promise<Prisma.UserCreateInput> {
    const password = await BcryptHelper.hash(this.password);

    return {
      ...this,
      password: password,
      createdBy: this.uid,
      updatedBy: this.uid,
    };
  }
  async validate(
    validator: EntityValidator<any>,
    optional?: object,
  ): Promise<this> {
    await validator.validate(this);
    return this;
  }
}
