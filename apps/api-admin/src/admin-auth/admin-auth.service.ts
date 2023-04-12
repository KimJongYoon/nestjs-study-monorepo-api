import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../libs/microservice/src';
import { AdminLoginAuthDto } from './dto/admin-login.auth.dto';
import { AdminAuthServiceException } from './exception/admin-auth.service.exception';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject('NATS_ADMIN_ACCOUNT_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 관리자 로그인
   * @param dto
   */
  async signIn(dto: AdminLoginAuthDto) {
    try {
      const record = NatsBuildHelper.buildNatsRecord({
        payload: dto,
        request: this.request,
      });

      const { accessToken, refreshToken } = await firstValueFrom(
        this.client.send(AuthChannelEnum.ADMIN_SIGN_IN, record),
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      AdminAuthServiceException.signIn(error);
    }
  }
}
