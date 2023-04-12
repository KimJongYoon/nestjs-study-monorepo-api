import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AdminAccountModel } from '../../../../libs/database/src';
import { NatsBuildHelper } from '../../../../libs/microservice/src';
import { AdminChannelEnum } from '../../../../libs/microservice/src/enum/channel/admin.channel.enum';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { AdminAccountServiceException } from './exception/admin-account.service-exception';

@Injectable()
export class AdminAccountService {
  constructor(
    @Inject('NATS_ADMIN_ACCOUNT_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}
  async create(dto: CreateAdminAccountDto): Promise<AdminAccountModel> {
    try {
      const record = NatsBuildHelper.buildNatsRecord({
        payload: dto,
        request: this.request,
      });

      const data = await firstValueFrom(
        this.client.send(AdminChannelEnum.CREATE, record),
      );

      return data;
    } catch (error) {
      AdminAccountServiceException.create(error);
    }
  }
}
