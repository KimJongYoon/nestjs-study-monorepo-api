import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiUsinController } from './api-usin.controller';
import { ApiUsinService } from './api-usin.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-usin/.env',
    }),
  ],
  controllers: [ApiUsinController],
  providers: [ApiUsinService],
})
export class ApiUsinModule {}
