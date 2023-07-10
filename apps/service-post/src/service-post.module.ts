import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheConfigService } from '../../../libs/core/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import {
  CacheInvalidationMicroserviceInterceptor,
  NatsConfigNameEnum,
} from '../../../libs/microservice/src';
import { AdminPostModule } from './admin-post/admin-post.module';
import postConfig from './config/post.config';
import { UsinPostModule } from './usin-post/usin-post.module';

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

    AdminPostModule,
    UsinPostModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInvalidationMicroserviceInterceptor,
    },
  ],
})
export class ServicePostModule {}
