import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GlobalValidationPipe } from '../../../libs/core/src';
import {
  NatsLoggingInterceptor,
  NatsQueueEnum,
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

  const config = configService.get('service-auth');

  await NatsInitHelper.init(app, config, NatsQueueEnum.AUTH_QUEUE);

  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  await app.listen(config.port);
}
bootstrap();
