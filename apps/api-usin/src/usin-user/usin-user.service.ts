import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';
import { UserChannelEnum } from '../../../../libs/microservice/src/enum/channel/user.channel.enum';
import { NatsBuildHelper } from '../../../../libs/microservice/src/helper/nats.build.helper';
import { CreateUserDto } from '../../../service-user/src/dto/create.user.dto';
import { EditUserDto } from '../../../service-user/src/dto/edit.user.dto';
import { CreateUsinUserDto } from './dto/create.usin-user.dto';
import { EditUsinUserDto } from './dto/edit.usin-user.dto';
import { UsinUserServiceException } from './exception/usin-user.service-exception';

@Injectable()
export class UsinUserService {
  constructor(
    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 사용자 상세 정보 조회
   * @param uid
   */
  async findOne(uid: string) {
    try {
      const record = NatsBuildHelper.buildNatsRecord({
        payload: { uid },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(UserChannelEnum.FIND_ONE_USIN, record),
      );

      return data;
    } catch (error) {
      UsinUserServiceException.findOne(error);
    }
  }

  /**
   * 사용자 등록
   * @param dto
   */
  async create(dto: CreateUsinUserDto): Promise<UserModel> {
    try {
      const record = NatsBuildHelper.buildNatsRecord<CreateUserDto>({
        payload: dto,
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(UserChannelEnum.CREATE, record),
      );

      return data;
    } catch (error) {
      UsinUserServiceException.create(error);
    }
  }

  /**
   * 사용자 정보 수정
   * @param dto
   */
  async edit(
    dto: EditUsinUserDto,
    condition: {
      uid: string;
    },
  ): Promise<UserModel> {
    try {
      const record = NatsBuildHelper.buildNatsRecord<EditUserDto>({
        payload: { ...dto, uid: condition.uid },
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(UserChannelEnum.EDIT, record),
      );

      return data;
    } catch (error) {
      UsinUserServiceException.edit(error);
    }
  }
}
