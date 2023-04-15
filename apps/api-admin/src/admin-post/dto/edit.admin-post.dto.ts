import { PickType } from '@nestjs/swagger';
import { PostModel } from '../../../../../libs/database/src/usin';

export class EditAdminPostDto extends PickType(PostModel, [
  'title',
  'content',
  'thumbnailUrl',
]) {}
