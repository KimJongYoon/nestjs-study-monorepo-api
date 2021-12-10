import { Module } from '@nestjs/common';
import { SessionApiController } from './session-api.controller';
import { SessionApiService } from './session-api.service';

@Module({
  imports: [],
  controllers: [SessionApiController],
  providers: [SessionApiService],
})
export class SessionApiModule {}
