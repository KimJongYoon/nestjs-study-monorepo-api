import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { PostChannelEnum } from '../../../../libs/microservice/src/enum/channel/post.channel.enum';
import { FindAllViewAdminPostDto } from '../admin-post/dto/find-all.view-admin-post.dto';
import { FindAllViewUsinPostDto } from './dto/find-all.view-usin-post.dto';
import { FindOneViewUsinPostDto } from './dto/find-one.view-usin-post.dto';
import { FindOneViewUsinPostEvent } from './event/find-one.view-usin-post.event';
import { PostEventEnum } from './event/usin-post.event-enum';
import { UsinPostService } from './usin-post.service';

@Controller()
export class UsinPostController {
  constructor(
    private readonly usinService: UsinPostService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @AsyncApiSub({
    summary: '[어신] 포스트 목록 조회',
    description: '[어신] 포스트 정보를 목록 조회 합니다.',
    channel: PostChannelEnum.FIND_ALL_USIN,
    message: {
      payload: FindAllViewUsinPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ALL_USIN)
  async findAllUsin(
    @Payload() dto: FindAllViewUsinPostDto,
    @Ctx() context: NatsContext,
  ) {
    const [datas, count] = await this.usinService.findAllUsin(dto);
    return [datas, count];
  }

  @AsyncApiSub({
    summary: '[어신] 포스트 상세 조회',
    description: '[어신] 포스트 정보를 상세 조회 합니다.',
    channel: PostChannelEnum.FIND_ONE_USIN,
    message: {
      payload: FindAllViewAdminPostDto,
    },
  })
  @MessagePattern(PostChannelEnum.FIND_ONE_USIN)
  async findOneUsin(
    @Payload() dto: FindOneViewUsinPostDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.usinService.findOneUsin(dto);

    // 어신 포스트 상세 조회 이벤트 발생
    await this.eventEmitter.emitAsync(
      PostEventEnum.POST_FIND_ONE_USIN,
      new FindOneViewUsinPostEvent(data),
    );

    return data;
  }
}
