import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RequestHelper } from '../../../../../libs/core/src';
import { IS_PASS_JWT_KEY } from '../../../../../libs/core/src/meta/public.meta';
import {
  AuthChannelEnum,
  NatsBuildHelper,
} from '../../../../../libs/microservice/src';
import { UsinAuthJwtGuardException } from '../exception/usin-auth.jwt-guard.exception';

@Injectable()
export class UsinJwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('NATS_AUTH_CLIENT') private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PASS_JWT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    req.requestId = RequestHelper.createRequestId();
    req.requestTime = RequestHelper.createRequestTime();

    // 토큰정보 조회
    const accessToken = this.getAccessToken(req);

    const payload = await this.validateToken(accessToken, req);

    this.appendPayload(req, payload);

    return true;
  }

  /**
   * 토큰 정보 조회
   * @param req
   * @returns
   */
  private getAccessToken(req: any): string {
    return req.headers?.authorization?.split('Bearer ')?.[1];
  }

  /**
   * 토큰 정보 유효성 검사
   * @param accessToken
   * @param req
   */
  private async validateToken(accessToken: string, req: any) {
    try {
      const record = NatsBuildHelper.buildNatsRecord({
        payload: { accessToken },
        request: req,
      });

      // 토큰 정보 확인
      const payload = await firstValueFrom(
        this.client.send(AuthChannelEnum.USIN_VALIDATE_TOKEN, record),
      );

      return payload;
    } catch (error) {
      UsinAuthJwtGuardException.validate(error);
    }
  }

  /**
   * Request에 토큰 정보 추가
   * @param req
   * @param payload
   */
  private appendPayload(req: any, payload: any) {
    req.user = payload;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
