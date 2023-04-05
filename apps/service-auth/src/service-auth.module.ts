import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
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

    UsinDatabaseModule,
  ],
  controllers: [ServiceAuthController],
  providers: [ServiceAuthService],
})
export class ServiceAuthModule {}
