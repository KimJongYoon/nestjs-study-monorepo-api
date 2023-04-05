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
import { AuthStrategyException } from '../exceptions/auth.strategy.exception';

@Injectable()
export class UsinLoginStrategy extends PassportStrategy(
  Strategy,
  'usin-login',
) {
  constructor(
    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
  ) {
    super({
      usernameField: 'uid',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(@Req() req, uid: string, password: string): Promise<any> {
    try {
      req.requestId = RequestHelper.createRequestId();
      req.requestTime = RequestHelper.createRequestTime();

      const record = NatsBuildHelper.buildNatsRecord({
        payload: { uid, password },
        request: req,
      });

      const user = await firstValueFrom(
        this.client.send(AuthChannelEnum.USIN_VALIDATE, record),
      );
      return user;
    } catch (error) {
      AuthStrategyException.validate(error);
    }
  }
}
