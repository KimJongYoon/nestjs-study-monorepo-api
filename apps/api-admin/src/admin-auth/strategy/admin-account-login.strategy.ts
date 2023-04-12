import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';
import { RequestHelper } from '../../../../../libs/core/src';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../../libs/microservice/src';
import { AdminAuthStrategyException } from '../exception/admin-auth.strategy.exception';

@Injectable()
export class AdminAccountLoginStrategy extends PassportStrategy(
  Strategy,
  'admin-account-login',
) {
  constructor(
    @Inject('NATS_ADMIN_ACCOUNT_CLIENT') private readonly client: ClientProxy,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(@Req() req, email: string, password: string): Promise<any> {
    try {
      req.requestId = RequestHelper.createRequestId();
      req.requestTime = RequestHelper.createRequestTime();

      const record = NatsBuildHelper.buildNatsRecord({
        payload: { email: email, password },
        request: req,
      });

      const user = await firstValueFrom(
        this.client.send(AuthChannelEnum.ADMIN_VALIDATE, record),
      );
      return user;
    } catch (error) {
      AdminAuthStrategyException.validate(error);
    }
  }
}
