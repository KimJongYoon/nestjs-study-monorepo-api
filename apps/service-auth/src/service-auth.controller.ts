import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { AsyncApiPub } from 'nestjs-asyncapi';
import { AuthChannelEnum } from '../../../libs/microservice/src/enum/auth.channel.enum';
import { ValidateUsinDto } from './dto/validate.usin.dto';
import { ServiceAuthService } from './service-auth.service';

@Controller()
export class ServiceAuthController {
  constructor(private readonly serviceAuthService: ServiceAuthService) {}

  @AsyncApiPub({
    channel: AuthChannelEnum.VALIDATE_USIN,
    message: {
      payload: ValidateUsinDto,
    },
  })
  @MessagePattern(AuthChannelEnum.VALIDATE_USIN)
  async validateUsin(
    @Payload() dto: ValidateUsinDto,
    @Ctx() context: NatsContext,
  ) {
    const data = await this.serviceAuthService.validateUsin(dto);
    return data;
  }
}
