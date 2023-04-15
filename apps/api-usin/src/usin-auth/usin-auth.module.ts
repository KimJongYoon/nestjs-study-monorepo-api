import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { UsinLoginGuard } from './guard/usin-login.guard';
import { UsinLoginStrategy } from './strategy/usin-login.strategy';
import { UsinAuthController } from './usin-auth.controller';
import { UsinAuthService } from './usin-auth.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_USER_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
        extraProviders: [
          {
            provide: 'configName',
            useValue: NatsConfigNameEnum.API_USIN,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.USER_QUEUE,
          },
        ],
      },
    ]),
  ],
  controllers: [UsinAuthController],
  providers: [UsinAuthService, UsinLoginGuard, UsinLoginStrategy],
})
export class UsinAuthModule {}
