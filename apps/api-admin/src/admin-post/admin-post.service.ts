import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NatsBuildHelper } from '../../../../libs/microservice/src';
import { PostChannelEnum } from '../../../../libs/microservice/src/enum/channel/post.channel.enum';
import { CreatePostDto } from '../../../service-post/src/dto/create.post.dto';
import { EditPostDto } from '../../../service-post/src/dto/edit.post.dto';
import { FindAllPostDto } from '../../../service-post/src/dto/find-all.post.dto';
import { FindOnePostDto } from '../../../service-post/src/dto/find-one.post.dto';
import { RemovePostDto } from '../../../service-post/src/dto/remove.post.dto';
import { CreateAdminPostDto } from './dto/create.admin-post.dto';
import { EditAdminPostDto } from './dto/edit.admin-post.dto';
import { FindAllAdminPostDto } from './dto/find-all.admin-post.dto';
import { AdminPostServiceException } from './exception/admin-post.service.exception';

@Injectable()
export class AdminPostService {
  constructor(
    @Inject('NATS_POST_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 포스트 목록 조회
   * @param dto
   */
  async findAll(dto: FindAllAdminPostDto) {
    try {
      const record = NatsBuildHelper.buildNatsRecord<FindAllPostDto>({
        payload: dto,
        request: this.request,
      });

      const [datas, count] = await firstValueFrom(
        this.client.send(PostChannelEnum.FIND_ALL_ADMIN, record),
      );

      return [datas, count];
    } catch (error) {
      AdminPostServiceException.findAll(error);
    }
  }

  /**
   * 포스트 상세 조회
   * @param postId
   */
  async findOne(postId: string) {
    try {
      const record = NatsBuildHelper.buildNatsRecord<FindOnePostDto>({
        payload: { postId: postId },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(PostChannelEnum.FIND_ONE_ADMIN, record),
      );

      return data;
    } catch (error) {
      AdminPostServiceException.findOne(error, postId);
    }
  }

  /**
   * 포스트 등록
   * @param dto
   */
  async create(dto: CreateAdminPostDto, adminEmail: string) {
    try {
      const record = NatsBuildHelper.buildNatsRecord<CreatePostDto>({
        payload: { ...dto, adminEmail: adminEmail },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(PostChannelEnum.CREATE, record),
      );

      return data;
    } catch (error) {
      AdminPostServiceException.create(error);
    }
  }

  /**
   * 포스트 수정
   * @param dto
   * @param adminEmail
   * @returns
   */
  async edit(
    dto: EditAdminPostDto,
    params: { postId: string; adminEmail: string },
  ) {
    try {
      const { postId, adminEmail } = params;

      const record = NatsBuildHelper.buildNatsRecord<EditPostDto>({
        payload: { ...dto, adminEmail: adminEmail, id: postId },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(PostChannelEnum.EDIT, record),
      );

      return data;
    } catch (error) {
      AdminPostServiceException.edit(error, params.postId);
    }
  }

  /**
   * 포스트 삭제
   * @param params
   * @returns
   */
  async remove(params: { postId: string; adminEmail: string }) {
    try {
      const { postId, adminEmail } = params;

      const record = NatsBuildHelper.buildNatsRecord<RemovePostDto>({
        payload: { adminEmail: adminEmail, id: postId },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(PostChannelEnum.REMOVE, record),
      );

      return data;
    } catch (error) {
      AdminPostServiceException.remove(error, params.postId);
    }
  }
}
