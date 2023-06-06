import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheConfigService } from '../../../libs/core/src';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import {
  CacheInvalidationMicroserviceInterceptor,
  NatsConfigNameEnum,
} from '../../../libs/microservice/src';
import postConfig from './config/post.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-post/.env',
      load: [postConfig, usinDatabaseConfig],
    }),

    EventEmitterModule.forRoot(),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: CacheConfigService,
      inject: [ConfigService],
      extraProviders: [
        {
          provide: 'configName',
          useValue: NatsConfigNameEnum.SERVICE_POST,
        },
      ],
    }),

    UsinDatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInvalidationMicroserviceInterceptor,
    },
  ],
})
export class ServicePostModule {}
