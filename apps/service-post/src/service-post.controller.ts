import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { PostChannelEnum } from '../../../libs/microservice/src/enum/channel/post.channel.enum';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FindAllPostDto } from './dto/find-all.post.dto';
import { FindOnePostDto } from './dto/find-one.post.dto';
import { RemovePostDto } from './dto/remove.post.dto';
import { ServicePostService } from './service-post.service';

@Controller()
export class ServicePostController {
  constructor(private readonly servicePostService: ServicePostService) {}

  @AsyncApiSub({
    summary: '포스트 목록 조회',
    description: '포스트 정보를 목록 조회 합니다.',
    channel: PostChannelEnum.FIND_ALL_ADMIN,
    message: {
      payload: FindAllPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ALL_ADMIN)
  async findAllAdmin(
    @Payload() dto: FindAllPostDto,
    @Ctx() context: NatsContext,
  ) {
    const [datas, count] = await this.servicePostService.findAllAdmin(dto);
    return [datas, count];
  }

  @AsyncApiSub({
    summary: '포스트 상세 조회',
    description: '포스트 정보를 상세 조회 합니다.',
    channel: PostChannelEnum.FIND_ONE_ADMIN,
    message: {
      payload: FindAllPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ONE_ADMIN)
  async findOneAdmin(
    @Payload() dto: FindOnePostDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.servicePostService.findOneAdmin(dto);
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
  @MessagePattern(PostChannelEnum.CREATE)
  async create(@Payload() dto: CreatePostDto, @Ctx() context: NatsContext) {
    const data = await this.servicePostService.create(dto);
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
  @MessagePattern(PostChannelEnum.EDIT)
  async edit(@Payload() dto: EditPostDto, @Ctx() context: NatsContext) {
    const data = await this.servicePostService.edit(dto);
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
  @MessagePattern(PostChannelEnum.REMOVE)
  async remove(@Payload() dto: RemovePostDto, @Ctx() context: NatsContext) {
    const data = await this.servicePostService.remove(dto);
    return data;
  }
}