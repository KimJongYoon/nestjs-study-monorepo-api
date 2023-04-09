import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../libs/microservice/src';
import { LoginAuthDto } from './dto/login.auth.dto';
import { AuthServiceException } from './exception/auth.service.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {}

  /**
   * 어신 사용자 로그인
   * @param dto
   */
  async signIn(dto: LoginAuthDto) {
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
      AuthServiceException.signIn(error);
    }
  }
}
