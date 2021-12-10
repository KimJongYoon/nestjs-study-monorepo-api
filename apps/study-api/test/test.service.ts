import { Injectable, Logger } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestRepository } from './test.repository';
import { Test } from './entities/test.entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  readonly logger = new Logger(TestService.name);

  async create(createTestDto: CreateTestDto) {
    const test: Test = createTestDto.toEntity(Test);
    await this.testRepository.persistAndFlush(test);
    return test;
  }

  async findAll() {
    return this.testRepository.findAll();
  }

  async findOne(id: string) {
    // @ts-ignore
    const test: Test = await this.testRepository.findOne(ObjectId(id));

    console.log(test.toDto(CreateTestDto));

    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    // @ts-ignore
    const savedTest = await this.testRepository.findOne(ObjectId(id));
    wrap(savedTest).assign(updateTestDto);
    await this.testRepository.flush();
    return savedTest;
  }

  async remove(id: string) {
    // @ts-ignore
    const savedTest = await this.testRepository.findOne(ObjectId(id));
    await this.testRepository.removeAndFlush(savedTest);
    return `This action removes a #${id} test`;
  }
}
