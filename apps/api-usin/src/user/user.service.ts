import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';
import { UserChannelEnum } from '../../../../libs/microservice/src/enum/user.channel.enum';
import { NatsBuildHelper } from '../../../../libs/microservice/src/helper/nats.build.helper';
import { CreateUserDto } from './dto/create.user.dto';
import { UserServiceException } from './exceptions/user.service-exception';

@Injectable()
export class UserService {
  constructor(
    @Inject('NATS_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 사용자 등록
   * @param dto
   */
  async create(dto: CreateUserDto): Promise<UserModel> {
    try {
      const record = NatsBuildHelper.buildNatsRecord(dto, this.request);

      const data = await firstValueFrom(
        this.client.send(UserChannelEnum.CREATE, record),
      );

      return data;
    } catch (error) {
      UserServiceException.create(error);
    }
  }
}
