import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, UseInterceptors} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {LocationInterceptor} from "../../common/src/set-location-interceptor.service";

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseInterceptors(LocationInterceptor)
  async create(@Body() createTestDto: CreateTestDto) {
    return await this.testService.create(createTestDto);
  }

  @Get()
  async findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(LocationInterceptor)
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }
}
