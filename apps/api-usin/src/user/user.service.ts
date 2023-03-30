import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import * as nats from 'nats';
import { firstValueFrom } from 'rxjs';
import { UserModel } from '../../../../libs/microservice/src';
import { CreateUserDto } from '../../../../libs/microservice/src/dto/create.user.dto';
import { UserServiceException } from './exceptions/user.service-exception';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  /**
   * 사용자 등록
   * @param dto
   */
  async create(dto: CreateUserDto): Promise<UserModel> {
    try {
      // header
      const headers = nats.headers();
      headers.set('requestId', '123123123123');

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
