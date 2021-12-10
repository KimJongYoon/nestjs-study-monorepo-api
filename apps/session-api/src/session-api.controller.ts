import { Controller, Get } from '@nestjs/common';
import { SessionApiService } from './session-api.service';

@Controller('session')
export class SessionApiController {
  constructor(private readonly sessionApiService: SessionApiService) {}

  @Get()
  getHello(): string {
    return this.sessionApiService.getHello();
  }
}
