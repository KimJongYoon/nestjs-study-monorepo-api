import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { UserChannelEnum } from '../../../libs/microservice/src/enum/channel/user.channel.enum';
import { CreateUserDto } from './dto/create.user.dto';
import { EditUserDto } from './dto/edit.user.dto';
import { FindOneUserDto } from './dto/find-one.user.dto';
import { ServiceUserService } from './service-user.service';

@Controller()
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @AsyncApiSub({
    summary: '[어신] 사용자 상세 조회',
    description: '[어신] 사용자 상세 정보를 조회합니다.',
    channel: UserChannelEnum.FIND_ONE_USIN,
    message: {
      payload: FindOneUserDto,
    },
  })
  @MessagePattern(UserChannelEnum.FIND_ONE_USIN)
  async findOneUsin(
    @Payload() dto: FindOneUserDto,
    @Ctx() context: NatsContext,
  ) {
    const { uid } = dto;
    const data = await this.serviceUserService.findOne(uid);
    return data;
  }

  @AsyncApiSub({
    summary: '사용자 상세 조회',
    description: '사용자 상세 정보를 조회합니다.',
    channel: UserChannelEnum.FIND_ONE,
    message: {
      payload: FindOneUserDto,
    },
  })
  @MessagePattern(UserChannelEnum.FIND_ONE)
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

  @AsyncApiSub({
    summary: '사용자 수정',
    description: '사용자 정보를 수정합니다.',
    channel: UserChannelEnum.EDIT,
    message: {
      payload: EditUserDto,
    },
  })
  @MessagePattern(UserChannelEnum.EDIT)
  async edit(@Payload() dto: EditUserDto, @Ctx() context: NatsContext) {
    const data = await this.serviceUserService.edit(dto);
    return data;
  }
}
