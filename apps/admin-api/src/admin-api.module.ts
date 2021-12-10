import { Logger, Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { CommonModule } from '../../common/src/common.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../study-api/src/config/env.configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import {RolesModule} from "../roles/roles.module";

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
    RolesModule,
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
