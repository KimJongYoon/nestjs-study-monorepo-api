import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, NatsContext } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BcryptHelper } from '../../../libs/core/src';
import { UsinDatabaseService } from '../../../libs/database/src';
import {
  NatsBuildHelper,
  NatsConfigNameEnum,
  NatsHeaderEnum,
  UserChannelEnum,
} from '../../../libs/microservice/src';
import { SignInUsinDto } from './dto/signin.usin.dto';
import { ValidateUsinDto } from './dto/validate.usin.dto';

@Injectable()
export class ServiceAuthService {
  constructor(
    private readonly usinDatabaseService: UsinDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject('NATS_USER_CLIENT') private readonly client: ClientProxy,
  ) {}

  /**
   * 사용자 인증(실패 시 401 에러)
   * @param uid
   * @param password
   * @returns
   */
  async validateUsin(dto: ValidateUsinDto): Promise<any> {
    const { uid, password } = dto;

    const user = await this.usinDatabaseService.user.findUnique({
      where: {
        uid: uid,
      },
    });

    const isNotExist = !user;
    if (isNotExist) {
      throw new UnauthorizedException('User not found.');
    }

    const isInvalidPassword = !(await BcryptHelper.compare(
      password,
      user?.password,
    ));
    if (isInvalidPassword) {
      throw new UnauthorizedException('Invalid password.');
    }

    const { password: notUsedField, ...result } = user;
    return result;
  }

  /**
   * 어신 사용자 로그인 처리
   * @param dto
   */
  async signInUsin(dto: SignInUsinDto, context: NatsContext) {
    const headers = context.getHeaders();
    const requestId = headers.get(NatsHeaderEnum.REQUEST_ID);

    const record = NatsBuildHelper.buildNatsRecord({
      payload: { uid: dto.uid },
      context,
    });

    // 사용자 정보 조회
    const user = await firstValueFrom(
      this.client.send(UserChannelEnum.FIND_ONE_USIN, record),
    );

    // jwt payload 설정
    const payload = { uid: user.uid, nickName: user.nickName };

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
   * 어신 사용자 토큰 검증
   */
  async validateAccessTokenUsin(accessToken: string, context: NatsContext) {
    const config = this.configService.get(NatsConfigNameEnum.SERVICE_AUTH);
    const payload = await this.jwtService.signAsync(accessToken, {
      secret: config.jwt.accessTokenSecret,
    });

    return payload;
  }
}
