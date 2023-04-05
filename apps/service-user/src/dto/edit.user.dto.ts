import { PartialType } from '@nestjs/swagger';
import {
  BcryptHelper,
  EntityBuilder,
  EntityValidator,
} from '../../../../libs/core/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';

export class EditUserDto
  extends PartialType(UserModel)
  implements EntityBuilder<Prisma.UserUpdateInput>
{
  async build(optional?: object): Promise<Prisma.UserUpdateInput> {
    const password = await BcryptHelper.hash(this.password);
    return {
      ...this,
      password,
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
