import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { AdminAccountController } from './admin-account.controller';
import { AdminAccountService } from './admin-account.service';

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
  controllers: [AdminAccountController],
  providers: [AdminAccountService],
})
export class AdminAccountModule {}
