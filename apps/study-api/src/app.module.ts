import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestModule } from '../test/test.module';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { CommonModule } from '../../common/src/common.module';
import Joi from 'joi';

const logger = new Logger('MikroORM');

const getEnvFilePath = (): string[] => {
  const envFilePaths = [];

  switch (process.env.NODE_ENV) {
    case 'dev':
      envFilePaths.push('.env.dev');
      break;
    case 'local':
      envFilePaths.push('.env.local');
      break;
  }
  return envFilePaths;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: getEnvFilePath(),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'local').required(),
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: `${process.env.DATABASE_NAME}`,
      type: 'mongo',
      timezone: '+09:00',
      clientUrl: `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
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
