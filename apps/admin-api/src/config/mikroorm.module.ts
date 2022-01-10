import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

export const mikroormModule = MikroOrmModule.forRoot({
  autoLoadEntities: true,
  dbName: `${process.env.DATABASE_NAME}`,
  type: 'mongo',
  timezone: '+09:00',
  clientUrl: `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
});
