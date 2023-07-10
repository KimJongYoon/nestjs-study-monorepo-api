import { AdminPostService } from './admin-post.service';

import { Module } from '@nestjs/common';
import { UsinDatabaseModule } from '../../../../libs/database/src';
import { AdminPostController } from './admin-post.controller';
import { AdminPostRepository } from './repository/admin-post.repository';
import { ViewAdminPostRepository } from './repository/view.admin-post.repository';
import { CommonPostValidator } from './validator/common.post.validator';
import { EditPostValidator } from './validator/edit.post.validator';
import { RemovePostValidator } from './validator/remove.post.validator';

@Module({
  imports: [UsinDatabaseModule],
  controllers: [AdminPostController],
  providers: [
    AdminPostService,

    AdminPostRepository,
    ViewAdminPostRepository,

    CommonPostValidator,
    EditPostValidator,
    RemovePostValidator,
  ],
})
export class AdminPostModule {}
