import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GlobalValidationPipe } from '../../../libs/core/src';
import {
  NatsLoggingInterceptor,
  RpcToHttpExceptionFilter,
} from '../../../libs/microservice/src';
import { NatsInitHelper } from '../../../libs/microservice/src/helper/nats.init.helper';
import { ServiceAuthModule } from './service-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceAuthModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.useGlobalInterceptors(new NatsLoggingInterceptor());

  const config = configService.get('auth');

  await NatsInitHelper.init(app, config, 'auth_queue');

  await app.listen(config.port);
}
bootstrap();
