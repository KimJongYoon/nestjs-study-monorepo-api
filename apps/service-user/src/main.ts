import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { GlobalValidationPipe } from '../../../libs/core/src';
import {
  NatsConfigNameEnum,
  NatsLoggingInterceptor,
  NatsQueueEnum,
} from '../../../libs/microservice/src';
import { RpcToHttpExceptionFilter } from '../../../libs/microservice/src/filter/rpc-to-http.exception.filter';
import { NatsInitHelper } from '../../../libs/microservice/src/helper/nats.init.helper';
import { ServiceUserModule } from './service-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceUserModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.useGlobalInterceptors(new NatsLoggingInterceptor());

  const config = configService.get(NatsConfigNameEnum.SERVICE_USER);
  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service API')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    // .addSecurity('user-password', { type: 'userPassword' })
    .addServer('dev', {
      url: `http://localhost:${config.port}`,
      protocol: 'tcp',
    })
    .build();

  const asyncApiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup('api', app, asyncApiDocument);

  await NatsInitHelper.init(app, config, NatsQueueEnum.USER_QUEUE);

  await app.listen(config.port);
}

bootstrap();
