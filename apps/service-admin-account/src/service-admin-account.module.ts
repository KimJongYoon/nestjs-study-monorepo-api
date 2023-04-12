import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import adminAccountConfig from './config/admin-account.config';
import { ServiceAdminAccountRepository } from './repository/service-admin-account.repository';
import { ServiceAdminAccountController } from './service-admin-account.controller';
import { ServiceAdminAccountService } from './service-admin-account.service';
import { CommonAdminAccountValidator } from './validator/common.admin-account.validator';
import { CreateAdminAccountValidator } from './validator/create.admin-account.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-admin-account/.env',
      load: [adminAccountConfig, usinDatabaseConfig],
    }),

    UsinDatabaseModule,
  ],
  controllers: [ServiceAdminAccountController],
  providers: [
    ServiceAdminAccountService,

    ServiceAdminAccountRepository,

    CommonAdminAccountValidator,
    CreateAdminAccountValidator,
  ],
})
export class ServiceAdminAccountModule {}
