import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminAccountModule } from './admin-account/admin-account.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
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
    AdminAuthModule,
    AdminAccountModule,
  ],
  controllers: [ApiAdminController],
  providers: [ApiAdminService],
})
export class ApiAdminModule {}
