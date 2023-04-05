import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../libs/microservice/src';
import authConfig from './config/auth.config';
import { ServiceAuthController } from './service-auth.controller';
import { ServiceAuthService } from './service-auth.service';

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

    JwtModule.register({
      global: true,
    }),

    UsinDatabaseModule,
  ],
  controllers: [ServiceAuthController],
  providers: [ServiceAuthService],
})
export class ServiceAuthModule {}
