import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../libs/microservice/src';
import { AdminAccountModule } from './admin-account/admin-account.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminJwtGuard } from './admin-auth/guard/admin-jwt.guard';
import { AdminPostModule } from './admin-post/admin-post.module';
import { ApiAdminController } from './api-admin.controller';
import { ApiAdminService } from './api-admin.service';
import apiAdminConfig from './config/api-admin.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-admin/.env',
      load: [apiAdminConfig],
    }),

    // for Jwt Guard
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

    AdminAuthModule,
    AdminAccountModule,
    AdminPostModule,
  ],
  controllers: [ApiAdminController],
  providers: [
    ApiAdminService,
    {
      provide: APP_GUARD,
      useClass: AdminJwtGuard,
    },
  ],
})
export class ApiAdminModule {}
