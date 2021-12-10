import { Controller, Get } from '@nestjs/common';
import { AdminApiService } from './admin-api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('관리자 관리')
@Controller('admin')
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @Get()
  getHello(): string {
    return this.adminApiService.getHello();
  }
}
