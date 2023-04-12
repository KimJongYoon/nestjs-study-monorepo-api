import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import {
  BcryptHelper,
  EntityBuilder,
  EntityValidator,
} from '../../../../libs/core/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';

export class EditUserDto
  extends IntersectionType(
    PickType(UserModel, ['uid']),
    PickType(PartialType(UserModel), ['nickName', 'password', 'email']),
  )
  implements EntityBuilder<Prisma.UserUpdateInput>
{
  async build(): Promise<Prisma.UserUpdateInput> {
    const response: Prisma.UserUpdateInput = {
      ...this,
      uid: undefined,
      updatedBy: this.uid,
    };

    if (this.password) {
      response.password = await BcryptHelper.hash(this.password);
    }

    return response;
  }
  async validate(validator: EntityValidator<any>): Promise<this> {
    await validator.validate(this);
    return this;
  }
}
