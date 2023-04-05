import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiPub } from 'nestjs-asyncapi';
import { AuthChannelEnum } from '../../../libs/microservice/src/enum/auth.channel.enum';
import { SignInUsinDto } from './dto/signin.usin.dto';
import { ValidateJwtUsinDto } from './dto/validate-jwt.usin.dto';
import { ValidateUsinDto } from './dto/validate.usin.dto';
import { ServiceAuthService } from './service-auth.service';

@Controller()
export class ServiceAuthController {
  constructor(private readonly serviceAuthService: ServiceAuthService) {}

  @AsyncApiPub({
    channel: AuthChannelEnum.USIN_VALIDATE,
    message: {
      payload: ValidateUsinDto,
    },
  })
  @MessagePattern(AuthChannelEnum.USIN_VALIDATE)
  async validateUsin(
    @Payload() dto: ValidateUsinDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAuthService.validateUsin(dto);
    return data;
  }

  @AsyncApiPub({
    channel: AuthChannelEnum.USIN_SIGN_IN,
    message: {
      payload: SignInUsinDto,
    },
  })
  @MessagePattern(AuthChannelEnum.USIN_SIGN_IN)
  async signInUsin(@Payload() dto: SignInUsinDto, @Ctx() context: NatsContext) {
    const data = await this.serviceAuthService.signInUsin(dto, context);
    return data;
  }

  @AsyncApiPub({
    channel: AuthChannelEnum.USIN_VALIDATE_TOKEN,
    message: {
      payload: ValidateJwtUsinDto,
    },
  })
  @MessagePattern(AuthChannelEnum.USIN_VALIDATE_TOKEN)
  async validateAccessTokenUsin(
    @Payload() dto: ValidateJwtUsinDto,
    @Ctx() context: NatsContext,
  ) {
    const { accessToken } = dto;
    const data = await this.serviceAuthService.validateAccessTokenUsin(
      accessToken,
      context,
    );
    return data;
  }
}
