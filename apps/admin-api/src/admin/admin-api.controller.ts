import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AdminApiService } from './admin-api.service';
import { ApiTags } from '@nestjs/swagger';
import { LocationInterceptor } from '../../../common/src/set-location-interceptor.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthPass } from '../../../session-api/src/jwt/jwt-auth-pass.decorator';

@ApiTags('관리자 관리')
@Controller('admin')
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @JwtAuthPass()
  @Post()
  @UseInterceptors(LocationInterceptor)
  async create(@Body() createAdminDtoDto: CreateAdminDto) {
    return await this.adminApiService.create(createAdminDtoDto);
  }

  @JwtAuthPass()
  @Get()
  async findAll() {
    return this.adminApiService.findAll();
  }

  @JwtAuthPass()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminApiService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(LocationInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminApiService.update(id, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminApiService.remove(id);
  }
}
