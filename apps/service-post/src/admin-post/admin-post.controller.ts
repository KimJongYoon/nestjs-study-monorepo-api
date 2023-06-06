/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { CacheEvict } from '../../../../libs/core/src';
import { PostChannelEnum } from '../../../../libs/microservice/src/enum/channel/post.channel.enum';
import { AdminPostService } from './admin-post.service';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FindAllViewAdminPostDto } from './dto/find-all.view-admin-post.dto';
import { FindOneViewAdminPostDto } from './dto/find-one.view-admin-post.dto';
import { RemovePostDto } from './dto/remove.post.dto';

@Controller()
export class AdminPostController {
  constructor(private readonly adminService: AdminPostService) {}

  @AsyncApiSub({
    summary: '[어드민] 포스트 목록 조회',
    description: '[어드민] 포스트 정보를 목록 조회 합니다.',
    channel: PostChannelEnum.FIND_ALL_ADMIN,
    message: {
      payload: FindAllViewAdminPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ALL_ADMIN)
  async findAllAdmin(
    @Payload() dto: FindAllViewAdminPostDto,
    @Ctx() context: NatsContext,
  ) {
    const [datas, count] = await this.adminService.findAll(dto);
    return [datas, count];
  }

  @AsyncApiSub({
    summary: '[어드민] 포스트 상세 조회',
    description: '[어드민] 포스트 정보를 상세 조회 합니다.',
    channel: PostChannelEnum.FIND_ONE_ADMIN,
    message: {
      payload: FindAllViewAdminPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ONE_ADMIN)
  async findOneAdmin(
    @Payload() dto: FindOneViewAdminPostDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.adminService.findOne(dto);
    return data;
  }

  @AsyncApiSub({
    summary: '포스트 등록',
    description: '포스트를 등록합니다.',
    channel: PostChannelEnum.CREATE,
    message: {
      payload: CreatePostDto,
    },
  })
  @CacheEvict('posts')
  @MessagePattern(PostChannelEnum.CREATE)
  async create(@Payload() dto: CreatePostDto, @Ctx() context: NatsContext) {
    const data = await this.adminService.create(dto);
    return data;
  }

  @AsyncApiSub({
    summary: '포스트 수정',
    description: '포스트를 수정합니다.',
    channel: PostChannelEnum.EDIT,
    message: {
      payload: EditPostDto,
    },
  })
  @CacheEvict('posts')
  @MessagePattern(PostChannelEnum.EDIT)
  async edit(@Payload() dto: EditPostDto, @Ctx() context: NatsContext) {
    const data = await this.adminService.edit(dto);
    return data;
  }

  @AsyncApiSub({
    summary: '포스트 삭제',
    description: '포스트를 삭제합니다.',
    channel: PostChannelEnum.REMOVE,
    message: {
      payload: EditPostDto,
    },
  })
  @CacheEvict('posts')
  @MessagePattern(PostChannelEnum.REMOVE)
  async remove(@Payload() dto: RemovePostDto, @Ctx() context: NatsContext) {
    const data = await this.adminService.remove(dto);
    return data;
  }
}
