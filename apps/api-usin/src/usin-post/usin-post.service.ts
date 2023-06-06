import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NatsBuildHelper } from '../../../../libs/microservice/src';
import { PostChannelEnum } from '../../../../libs/microservice/src/enum/channel/post.channel.enum';
import { FindAllViewUsinPostDto } from '../../../service-post/src/usin-post/dto/find-all.view-usin-post.dto';
import { FindOneViewUsinPostDto } from '../../../service-post/src/usin-post/dto/find-one.view-usin-post.dto';
import { FindAllUsinPostDto } from './dto/find-all.usin-post.dto';
import { UsinPostServiceException } from './exception/usin-post.service.exception';

@Injectable()
export class UsinPostService {
  constructor(
    @Inject('NATS_POST_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 포스트 목록 조회
   * @param dto
   * @returns
   */
  async findAll(dto: FindAllUsinPostDto) {
    try {
      const record = NatsBuildHelper.buildNatsRecord<FindAllViewUsinPostDto>({
        payload: dto,
        request: this.request,
      });

      const [datas, count] = await firstValueFrom(
        this.client.send(PostChannelEnum.FIND_ALL_USIN, record),
      );

      return [datas, count];
    } catch (error) {
      UsinPostServiceException.findAll(error);
    }
  }

  /**
   * 포스트 상세 조회
   * @param postId
   * @returns
   */
  async findOne(postId: string) {
    try {
      const record = NatsBuildHelper.buildNatsRecord<FindOneViewUsinPostDto>({
        payload: { postId: postId },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(PostChannelEnum.FIND_ONE_USIN, record),
      );

      return data;
    } catch (error) {
      UsinPostServiceException.findOne(error);
    }
  }
}
