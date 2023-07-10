import { PickType } from '@nestjs/swagger';
import { EntityBuilder, EntityValidator } from '../../../../../libs/core/src';
import { PostModel } from '../../../../../libs/database/src';
import { Prisma } from '../../../../../libs/database/src/usin/generated/client';

export class CreatePostDto
  extends PickType(PostModel, [
    'title',
    'content',
    'published',
    'thumbnailUrl',
    'adminEmail',
  ])
  implements EntityBuilder<Prisma.PostUncheckedCreateInput>
{
  async build(optional?: object): Promise<Prisma.PostUncheckedCreateInput> {
    return {
      ...this,
      createdBy: this.adminEmail,
      updatedBy: this.adminEmail,
    };
  }
  async validate(
    validator: EntityValidator<any>,
    optional?: object,
  ): Promise<this> {
    return this;
  }
}
