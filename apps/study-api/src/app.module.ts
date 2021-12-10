import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/env.configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestModule } from '../test/test.module';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { CommonModule } from '../../common/src/common.module';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: 'study-api',
      type: 'mongo',
      timezone: '+09:00',
      clientUrl: `${configuration().database.host}:${
        configuration().database.port
      }`,
      highlighter: new SqlHighlighter(),
      debug: true,
      logger: logger.log.bind(logger),
    }),
    CommonModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
