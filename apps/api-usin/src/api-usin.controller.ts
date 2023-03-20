import { Controller, Get } from '@nestjs/common';
import { ApiUsinService } from './api-usin.service';

@Controller()
export class ApiUsinController {
  constructor(private readonly apiUsinService: ApiUsinService) {}

  @Get()
  async info(): Promise<string> {
    return this.apiUsinService.info();
  }
}
