import { Module } from '@nestjs/common';
import { PartnersDatabaseService } from './partners.database.service';

@Module({
  providers: [PartnersDatabaseService],
  exports: [PartnersDatabaseService],
})
export class PartnersDatabaseModule {}
