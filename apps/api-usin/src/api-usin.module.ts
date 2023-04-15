import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../libs/microservice/src';
import { ApiUsinController } from './api-usin.controller';
import { ApiUsinService } from './api-usin.service';
import apiUsinConfig from './config/api-usin.config';
import { UsinJwtGuard } from './usin-auth/guard/usin-jwt.guard';
import { UsinAuthModule } from './usin-auth/usin-auth.module';
import { UsinUserModule } from './usin-user/usin-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-usin/.env',
      load: [apiUsinConfig],
    }),

    // for Jwt Guard
    ClientsModule.registerAsync([
      {
        name: 'NATS_AUTH_CLIENT',
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
            useValue: NatsQueueEnum.AUTH_QUEUE,
          },
        ],
      },
    ]),

    UsinAuthModule,
    UsinUserModule,
  ],
  controllers: [ApiUsinController],
  providers: [
    ApiUsinService,
    {
      provide: APP_GUARD, // 전역으로 사용할 guard 설정
      useClass: UsinJwtGuard,
    },
  ],
})
export class ApiUsinModule {}
