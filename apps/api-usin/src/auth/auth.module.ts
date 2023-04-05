import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsinLoginGuard } from './guard/usin-login.guard';
import { UsinLoginStrategy } from './strategy/usin-login.strategy';

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
  controllers: [AuthController],
  providers: [AuthService, UsinLoginGuard, UsinLoginStrategy],
})
export class AuthModule {}
