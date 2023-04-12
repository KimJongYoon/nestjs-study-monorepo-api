import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminAccountLoginGuard } from './guard/admin-account-login.guard';
import { AdminJwtGuard } from './guard/admin-jwt.guard';
import { AdminAccountLoginStrategy } from './strategy/admin-account-login.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_ADMIN_ACCOUNT_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
        extraProviders: [
          {
            provide: 'configName',
            useValue: NatsConfigNameEnum.API_ADMIN,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.ADMIN_QUEUE,
          },
        ],
      },
    ]),
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    AdminAccountLoginGuard,
    AdminAccountLoginStrategy,

    AdminJwtGuard,
  ],
})
export class AdminAuthModule {}
