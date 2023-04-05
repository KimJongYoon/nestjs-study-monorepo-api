import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiPub } from 'nestjs-asyncapi';
import { CreateUserDto } from './dto/create.user.dto';
import { ServiceUserService } from './service-user.service';
import { UserChannelEnum } from '../../../libs/microservice/src/enum/user.channel.enum';

@Controller()
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @AsyncApiPub({
    channel: UserChannelEnum.CREATE,
    message: {
      payload: CreateUserDto,
    },
  })
  @MessagePattern(UserChannelEnum.CREATE)
  async create(@Payload() dto: CreateUserDto, @Ctx() context: NatsContext) {
    const data = await this.serviceUserService.create(dto);
    return data;
  }
}
