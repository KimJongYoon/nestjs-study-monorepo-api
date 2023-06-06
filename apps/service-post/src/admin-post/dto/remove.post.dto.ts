import { IntersectionType, PickType } from '@nestjs/swagger';
import { EntityBuilder, EntityValidator } from '../../../../../libs/core/src';
import { PostModel } from '../../../../../libs/database/src';
import {
  BooleanTypes,
  Prisma,
} from '../../../../../libs/database/src/usin/generated/client';

export class RemovePostDto
  extends IntersectionType(PickType(PostModel, ['id', 'adminEmail']))
  implements EntityBuilder<Prisma.PostUpdateInput>
{
  async build(optional?: object): Promise<Prisma.PostUpdateInput> {
    return {
      ...this,
      useYn: BooleanTypes.N,
      deletedBy: this.adminEmail,
      deletedAt: new Date(),
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
