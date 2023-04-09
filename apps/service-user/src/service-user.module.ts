import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import userConfig from './config/user.config';
import { ServiceUserRepository } from './repository/service-user.repository';
import { ViewServiceUserRepository } from './repository/view.service-user.repository';
import { ServiceUserController } from './service-user.controller';
import { ServiceUserService } from './service-user.service';
import { CommonUserValidator } from './validator/common.user.validator';
import { CreateUserValidator } from './validator/create.user.validator';
import { EditUserValidator } from './validator/edit.user.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-user/.env',
      load: [userConfig, usinDatabaseConfig],
    }),

    UsinDatabaseModule,
  ],
  controllers: [ServiceUserController],
  providers: [
    ServiceUserService,
    ServiceUserRepository,
    ViewServiceUserRepository,

    CommonUserValidator,
    CreateUserValidator,
    EditUserValidator,
  ],
})
export class ServiceUserModule {}
