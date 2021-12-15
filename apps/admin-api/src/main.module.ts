import { Logger, Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import configuration from './config/env.configuration';
import { CommonModule } from '../../common/src/common.module';
import { RolesModule } from './roles/roles.module';
import { AdminApiModule } from './admin/admin-api.module';

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
    AdminApiModule,
  ],
})
export class MainModule {}
