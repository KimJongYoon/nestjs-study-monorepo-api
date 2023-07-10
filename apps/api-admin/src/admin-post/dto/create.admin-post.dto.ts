import { PickType } from '@nestjs/swagger';
import { PostModel } from '../../../../../libs/database/src/usin';

export class CreateAdminPostDto extends PickType(PostModel, [
  'title',
  'content',
  'published',
  'thumbnailUrl',
]) {}
