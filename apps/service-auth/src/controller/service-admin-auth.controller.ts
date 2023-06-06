import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { AuthChannelEnum } from '../../../../libs/microservice/src/enum/channel/auth.channel.enum';
import { SignInAdminAccountDto } from '../dto/signin.admin.dto';
import { ValidateJwtAdminAccountDto } from '../dto/validate-jwt.admin.dto';
import { ValidateAdminAccountDto } from '../dto/validate.admin.dto';
import { ServiceAdminAccountAuthService } from '../service/service-admin-auth.service';

@Controller()
export class ServiceAdminAuthController {
  constructor(
    private readonly serviceAdminAccountAuthService: ServiceAdminAccountAuthService,
  ) {}

  @AsyncApiSub({
    channel: AuthChannelEnum.ADMIN_VALIDATE,
    message: {
      payload: ValidateAdminAccountDto,
    },
  })
  @MessagePattern(AuthChannelEnum.ADMIN_VALIDATE)
  async validateAccount(
    @Payload() dto: ValidateAdminAccountDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAdminAccountAuthService.validateAdmin(
      dto,
      context,
    );
    return data;
  }

  @AsyncApiSub({
    channel: AuthChannelEnum.ADMIN_SIGN_IN,
    message: {
      payload: SignInAdminAccountDto,
    },
  })
  @MessagePattern(AuthChannelEnum.ADMIN_SIGN_IN)
  async signIn(
    @Payload() dto: SignInAdminAccountDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAdminAccountAuthService.signInAdmin(
      dto,
      context,
    );
    return data;
  }

  @AsyncApiSub({
    channel: AuthChannelEnum.ADMIN_VALIDATE_TOKEN,
    message: {
      payload: ValidateJwtAdminAccountDto,
    },
  })
  @MessagePattern(AuthChannelEnum.ADMIN_VALIDATE_TOKEN)
  async validateAccessToken(
    @Payload() dto: ValidateJwtAdminAccountDto,
    @Ctx() context: NatsContext,
  ) {
    const { accessToken } = dto;
    const data =
      await this.serviceAdminAccountAuthService.validateAccessTokenAdmin(
        accessToken,
        context,
      );
    return data;
  }
}
