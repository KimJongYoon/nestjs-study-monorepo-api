import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { UsinUserController } from './usin-user.controller';
import { UsinUserService } from './usin-user.service';

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
  controllers: [UsinUserController],
  providers: [UsinUserService],
})
export class UsinUserModule {}
