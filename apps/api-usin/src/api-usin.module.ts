import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiUsinController } from './api-usin.controller';
import { ApiUsinService } from './api-usin.service';
import { AuthModule } from './auth/auth.module';
import apiUsinConfig from './config/api-usin.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-usin/.env',
      load: [apiUsinConfig],
    }),

    AuthModule,
    UserModule,
  ],
  controllers: [ApiUsinController],
  providers: [ApiUsinService],
})
export class ApiUsinModule {}
