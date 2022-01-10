import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TestModule } from '../test/test.module';
import { CommonModule } from '../../common/src/common.module';
import { configModule } from '../../common/config.module';
import { mikroormModule } from './config/mikroorm.module';

@Module({
  imports: [configModule, mikroormModule, CommonModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
