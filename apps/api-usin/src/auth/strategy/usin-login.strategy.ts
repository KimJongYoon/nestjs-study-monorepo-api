import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';
import { AuthChannelEnum } from '../../../../../libs/microservice/src/enum/auth.channel.enum';
import { NatsBuildHelper } from '../../../../../libs/microservice/src/helper/nats.build.helper';

@Injectable()
export class UsinLoginStrategy extends PassportStrategy(
  Strategy,
  'usin-login',
) {
  constructor(
    @Inject('NATS_CLIENT') private readonly client: ClientProxy,
    @Inject(REQUEST) private request,
  ) {
    super({ usernameField: 'uid', passwordField: 'password' });
  }

  async validate(uid: string, password: string): Promise<any> {
    const record = NatsBuildHelper.buildNatsRecord(
      { uid, password },
      this.request,
    );

    const user = await firstValueFrom(
      this.client.send(AuthChannelEnum.VALIDATE_USIN, record),
    );
    return user;
  }
}
