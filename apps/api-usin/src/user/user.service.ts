import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import * as nats from 'nats';
import { firstValueFrom } from 'rxjs';
import { UserModel } from '../../../../libs/microservice/src';
import { CreateUserDto } from '../../../../libs/microservice/src/dto/create.user.dto';
import { UserServiceException } from './exceptions/user.service-exception';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 사용자 등록
   * @param dto
   */
  async create(dto: CreateUserDto): Promise<UserModel> {
    try {
      // header
      const headers = nats.headers();
      const requestId = this.request?.requestId ?? '';
      headers.set('request-id', requestId.toString());

      const record = new NatsRecordBuilder(dto).setHeaders(headers).build();

      const data = await firstValueFrom(
        this.client.send('user.create', record),
      );

      return data;
    } catch (error) {
      UserServiceException.create(error);
    }
  }
}
