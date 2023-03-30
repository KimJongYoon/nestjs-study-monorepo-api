import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiPub } from 'nestjs-asyncapi';
import { CreateUserDto } from '../../../libs/microservice/src/dto/create.user.dto';
import { ServiceUserService } from './service-user.service';

@Controller()
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @AsyncApiPub({
    channel: 'user.create',
    message: {
      payload: CreateUserDto,
    },
  })
  @MessagePattern('user.create')
  async create(@Payload() dto: CreateUserDto, @Ctx() context: NatsContext) {
    Logger.log(
      `user.create context: ${JSON.stringify(
        context.getSubject(),
      )}, dto: ${JSON.stringify(dto)}, headers: ${JSON.stringify(
        context.getHeaders()?.headers,
      )}`,
    );

    const headers = context.getHeaders().headers;
    const version = headers.get('x-version')?.[0];
    const author = headers.get('author')?.[0];
    const requestId = headers.get('requestId')?.[0];

    const data = await this.serviceUserService.create(dto);
    return data;
  }
}
