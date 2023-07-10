import { PartialType, PickType } from '@nestjs/swagger';
import { PostModel } from '../../../../../libs/database/src/usin';

export class EditAdminPostDto extends PickType(PartialType(PostModel), [
  'title',
  'content',
  'published',
  'thumbnailUrl',
]) {}
