import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from './entities/test.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
