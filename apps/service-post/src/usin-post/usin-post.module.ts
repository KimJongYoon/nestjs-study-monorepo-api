import { Module } from '@nestjs/common';
import { UsinPostRepository } from './repository/usin-post.repository';
import { ViewUsinPostRepository } from './repository/view.usin-post.repository';
import { UsinPostController } from './usin-post.controller';
import { UsinPostListener } from './usin-post.listener';
import { UsinPostService } from './usin-post.service';

@Module({
  imports: [],
  controllers: [UsinPostController],
  providers: [
    UsinPostService,

    UsinPostListener,

    UsinPostRepository,
    ViewUsinPostRepository,
  ],
})
export class UsinPostModule {}
