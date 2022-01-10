import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/src/common.module';
import { SessionsModule } from './sessions/sessions.module';
import { configModule } from '../../common/config.module';
import { mikroormModule } from '../../study-api/src/config/mikroorm.module';

@Module({
  imports: [configModule, mikroormModule, CommonModule, SessionsModule],
})
export class MainModule {}
