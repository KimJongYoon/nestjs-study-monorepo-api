import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { EntityBuilder, EntityValidator } from '../../../../libs/core/src';
import { PostModel } from '../../../../libs/database/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';

export class EditPostDto
  extends IntersectionType(
    PickType(PostModel, ['id']),
    PickType(PartialType(PostModel), [
      'title',
      'content',
      'thumbnailUrl',
      'adminEmail',
      'remark',
    ]),
  )
  implements EntityBuilder<Prisma.PostUpdateInput>
{
  async build(optional?: object): Promise<Prisma.PostUpdateInput> {
    return {
      ...this,
      updatedBy: this.adminEmail,
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
