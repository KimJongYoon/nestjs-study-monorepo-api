import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../../libs/database/src/database.config';
import { ServiceAuthController } from './service-auth.controller';
import { ServiceAuthService } from './service-auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-auth/.env',
      load: [databaseConfig],
    }),
  ],
  controllers: [ServiceAuthController],
  providers: [ServiceAuthService],
})
export class ServiceAuthModule {}
