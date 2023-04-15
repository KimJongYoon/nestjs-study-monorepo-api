import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../libs/microservice/src';
import { LoginUsinAuthDto } from './dto/login.usin-auth.dto';
import { UsinAuthServiceException } from './exception/usin-auth.service.exception';

@Injectable()
export class UsinAuthService {
  constructor(
    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 어신 사용자 로그인
   * @param dto
   */
  async signIn(dto: LoginUsinAuthDto) {
    try {
      const record = NatsBuildHelper.buildNatsRecord({
        payload: dto,
        request: this.request,
      });

      const { accessToken, refreshToken } = await firstValueFrom(
        this.client.send(AuthChannelEnum.USIN_SIGN_IN, record),
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      UsinAuthServiceException.signIn(error);
    }
  }
}
