import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, NatsContext } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BcryptHelper } from '../../../../libs/core/src';
import { UsinDatabaseService } from '../../../../libs/database/src';
import {
  NatsBuildHelper,
  NatsConfigNameEnum,
  NatsHeaderEnum,
} from '../../../../libs/microservice/src';
import { AdminChannelEnum } from '../../../../libs/microservice/src/enum/channel/admin.channel.enum';
import { SignInAdminAccountDto } from '../dto/signin.admin.dto';
import { ValidateAdminAccountDto } from '../dto/validate.admin.dto';
import { AuthServiceException } from '../exception/auth.service-exception';

@Injectable()
export class ServiceAdminAccountAuthService {
  constructor(
    private readonly usinDatabaseService: UsinDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject('NATS_ADMIN_CLIENT') private readonly client: ClientProxy,
  ) {}

  /**
   * 사용자 인증(실패 시 401 에러)
   * @param uid
   * @param password
   * @returns
   */
  async validateAdmin(
    dto: ValidateAdminAccountDto,
    context: NatsContext,
  ): Promise<any> {
    const { email, password } = dto;

    const admin = await this.getAdminAccount(context, dto);

    const isNotExist = !admin;
    if (isNotExist) {
      throw new UnauthorizedException('Admin not found.');
    }

    const isInvalidPassword = !(await BcryptHelper.compare(
      password,
      admin?.password,
    ));
    if (isInvalidPassword) {
      throw new UnauthorizedException('Invalid password.');
    }

    const { password: notUsedField, ...result } = admin;
    return result;
  }

  /**
   * 관리자 계정 로그인 처리
   * @param dto
   */
  async signInAdmin(dto: SignInAdminAccountDto, context: NatsContext) {
    const admin = await this.getAdminAccount(context, dto);

    // jwt payload 설정
    const payload = { email: admin.email, nickName: admin.nickName };

    // jwt 생성
    const config = this.configService.get(NatsConfigNameEnum.SERVICE_AUTH);

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: config.jwt.accessTokenExpiresIn,
      secret: config.jwt.accessTokenSecret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: config.jwt.refreshTokenExpiresIn,
      secret: config.jwt.refreshTokenSecret,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * 사용자 정보 조회
   * @param context
   * @param dto
   * @returns
   */
  private async getAdminAccount(
    context: NatsContext,
    dto: SignInAdminAccountDto,
  ) {
    const headers = context.getHeaders();
    const requestId = headers.get(NatsHeaderEnum.REQUEST_ID);

    const record = NatsBuildHelper.buildNatsRecord({
      payload: { email: dto.email },
      context,
    });

    // 사용자 정보 조회
    const admin = await firstValueFrom(
      this.client.send(AdminChannelEnum.FIND_ONE, record),
    );
    return admin;
  }

  /**
   * 관리자 계정 토큰 검증
   */
  async validateAccessTokenAdmin(accessToken: string, context: NatsContext) {
    try {
      const config = this.configService.get(NatsConfigNameEnum.SERVICE_AUTH);
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: config.jwt.accessTokenSecret,
      });

      return payload;
    } catch (error) {
      AuthServiceException.validateAccessTokenUsin(error);
    }
  }
}
