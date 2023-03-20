import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import { ServiceUserController } from './service-user.controller';
import { ServiceUserRepository } from './service-user.repository';
import { ServiceUserService } from './service-user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-user/.env',
      load: [usinDatabaseConfig],
    }),

    UsinDatabaseModule,
  ],
  controllers: [ServiceUserController],
  providers: [ServiceUserService, ServiceUserRepository],
})
export class ServiceUserModule {}
