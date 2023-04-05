import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { UserChannelEnum } from '../../../libs/microservice/src/enum/user.channel.enum';
import { CreateUserDto } from './dto/create.user.dto';
import { FindOneUserDto } from './dto/find-one.user.dto';
import { ServiceUserService } from './service-user.service';

@Controller()
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @AsyncApiSub({
    summary: '사용자 상세 조회',
    description: '사용자 상세 정보를 조회합니다.',
    channel: UserChannelEnum.FIND_ONE_USIN,
    message: {
      payload: FindOneUserDto,
    },
  })
  @MessagePattern(UserChannelEnum.FIND_ONE_USIN)
  async findOne(@Payload() dto: FindOneUserDto, @Ctx() context: NatsContext) {
    const { uid } = dto;
    const data = await this.serviceUserService.findOne(uid);
    return data;
  }

  @AsyncApiSub({
    summary: '사용자 등록',
    description: '사용자를 등록합니다.',
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
