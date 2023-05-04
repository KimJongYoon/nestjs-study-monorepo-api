import { CacheInterceptor } from '@nestjs/cache-manager';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { CacheConfigService } from '../../../libs/core/src/cache/cache.config.service';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../libs/microservice/src';
import authConfig from './config/auth.config';
import { ServiceAdminAuthController } from './controller/service-admin-auth.controller';
import { ServiceUserAuthController } from './controller/service-auth.controller';
import { ServiceAdminAccountAuthService } from './service/service-admin-auth.service';
import { ServiceUserAuthService } from './service/service-auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-auth/.env',
      load: [authConfig, usinDatabaseConfig],
    }),

    ClientsModule.registerAsync([
      {
        name: 'NATS_USER_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
        extraProviders: [
          {
            provide: 'configName',
            useValue: NatsConfigNameEnum.SERVICE_AUTH,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.USER_QUEUE,
          },
        ],
      },
    ]),

    ClientsModule.registerAsync([
      {
        name: 'NATS_ADMIN_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
        extraProviders: [
          {
            provide: 'configName',
            useValue: NatsConfigNameEnum.SERVICE_AUTH,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.ADMIN_QUEUE,
          },
        ],
      },
    ]),

    JwtModule.register({
      global: true,
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: CacheConfigService,
      inject: [ConfigService],
      extraProviders: [
        {
          provide: 'configName',
          useValue: NatsConfigNameEnum.SERVICE_AUTH,
        },
      ],
    }),

    UsinDatabaseModule,
  ],
  controllers: [ServiceUserAuthController, ServiceAdminAuthController],
  providers: [
    ServiceUserAuthService,
    ServiceAdminAccountAuthService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class ServiceAuthModule {}
