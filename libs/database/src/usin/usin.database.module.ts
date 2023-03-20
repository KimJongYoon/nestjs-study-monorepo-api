import { Module } from '@nestjs/common';
import { UsinDatabaseService } from './usin.database.service';

@Module({
  providers: [UsinDatabaseService],
  exports: [UsinDatabaseService],
})
export class UsinDatabaseModule {}
