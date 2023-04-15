import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import {
  BcryptHelper,
  EntityBuilder,
  EntityValidator,
} from '../../../../libs/core/src';
import { AdminAccountModel } from '../../../../libs/database/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';

export class EditAdminAccountDto
  extends IntersectionType(
    PickType(AdminAccountModel, ['email']),
    PickType(PartialType(AdminAccountModel), [
      'password',
      'nickName',
      'remark',
    ]),
  )
  implements EntityBuilder<Prisma.AdminAccountCreateInput>
{
  async build(optional?: object): Promise<Prisma.AdminAccountCreateInput> {
    const password = await BcryptHelper.hash(this.password);

    return {
      ...this,
      password: password,
      createdBy: this.email,
      updatedBy: this.email,
    };
  }
  async validate(
    validator: EntityValidator<any>,
    optional?: object,
  ): Promise<this> {
    await validator.validate(this, optional);

    return this;
  }
}
