import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../../libs/database/src/database.config';
import { ServiceFishinggramController } from './service-fishinggram.controller';
import { ServiceFishinggramService } from './service-fishinggram.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-fishinggram/.env',
      load: [databaseConfig],
    }),
  ],
  controllers: [ServiceFishinggramController],
  providers: [ServiceFishinggramService],
})
export class ServiceFishinggramModule {}
