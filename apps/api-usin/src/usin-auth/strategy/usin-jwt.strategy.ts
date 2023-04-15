import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';
import { RequestHelper } from '../../../../../libs/core/src';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../../libs/microservice/src';

/**
 * usin-api에서 jwt의 secret key를 조회할 수 없어 아래의 jwt strategy를 사용할 수 없습니다.
 */
@Injectable()
export class UsinJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      // secretOrKey: configService.get<string>("jwt.secret"),
    });
  }

  /**
   * 토큰 정보 확인
   * @param req
   * @param payload
   */
  async validate(req, payload: { uid: string; nick_name: string }) {
    req.requestId = RequestHelper.createRequestId();
    req.requestTime = RequestHelper.createRequestTime();

    // 토큰정보 조회
    const accessToken = this.getAccessToken(req);

    const record = NatsBuildHelper.buildNatsRecord({
      payload: accessToken,
      request: req,
    });

    // 토큰 정보 확인
    await firstValueFrom(
      this.client.send(AuthChannelEnum.USIN_VALIDATE_TOKEN, record),
    );
    // TODO auth service에서 토큰 정보 확인

    const result = {
      ...payload,
    };

    return result;
  }

  /**
   * 토큰 정보 조회
   * @param req
   * @returns
   */
  private getAccessToken(req: any): string {
    return req.headers?.authorization?.split('Bearer ')?.[1];
  }
}
