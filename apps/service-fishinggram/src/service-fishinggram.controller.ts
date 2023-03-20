import { Controller, Get } from '@nestjs/common';
import { ServiceFishinggramService } from './service-fishinggram.service';

@Controller()
export class ServiceFishinggramController {
  constructor(private readonly serviceFishinggramService: ServiceFishinggramService) {}

  @Get()
  getHello(): string {
    return this.serviceFishinggramService.getHello();
  }
}
