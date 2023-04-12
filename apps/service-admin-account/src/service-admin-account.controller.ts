import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { AdminChannelEnum } from '../../../libs/microservice/src/enum/channel/admin.channel.enum';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { EditAdminAccountDto } from './dto/edit.admin-account.dto';
import { FindOneAdminAccountDto } from './dto/find-one.admin-account.dto';
import { ServiceAdminAccountService } from './service-admin-account.service';

@Controller()
export class ServiceAdminAccountController {
  constructor(
    private readonly serviceAdminAccountService: ServiceAdminAccountService,
  ) {}

  @AsyncApiSub({
    summary: '관리자 상세 조회',
    description: '관리자 상세 정보를 조회합니다.',
    channel: AdminChannelEnum.FIND_ONE,
    message: {
      payload: FindOneAdminAccountDto,
    },
  })
  @MessagePattern(AdminChannelEnum.FIND_ONE)
  async findOne(
    @Payload() dto: FindOneAdminAccountDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAdminAccountService.findOne(dto);
    return data;
  }

  @AsyncApiSub({
    summary: '관리자 계정 정보 등록',
    description: '관리자 계정 정보를 등록 합니다.',
    channel: AdminChannelEnum.CREATE,
    message: {
      payload: CreateAdminAccountDto,
    },
  })
  @MessagePattern(AdminChannelEnum.CREATE)
  async create(
    @Payload() dto: CreateAdminAccountDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAdminAccountService.create(dto);
    return data;
  }

  @AsyncApiSub({
    summary: '관리자 계정 정보 수정',
    description: '관리자 계정 정보를 수정 합니다.',
    channel: AdminChannelEnum.EDIT,
    message: {
      payload: CreateAdminAccountDto,
    },
  })
  @MessagePattern(AdminChannelEnum.EDIT)
  async edit(@Payload() dto: EditAdminAccountDto, @Ctx() context: NatsContext) {
    const data = await this.serviceAdminAccountService.edit(dto);
    return data;
  }
}
