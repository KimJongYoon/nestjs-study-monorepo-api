import { Logger, Module } from '@nestjs/common';
import { CommonModule } from '../../common/src/common.module';
import { AdminApiModule } from '../../admin-api/src/admin/admin-api.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../admin-api/src/config/env.configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { RolesModule } from '../../admin-api/src/roles/roles.module';
import {SessionsModule} from "./sessions/sessions.module";

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
    SessionsModule,
  ],
})
export class MainModule {}
