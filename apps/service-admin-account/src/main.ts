import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { GlobalValidationPipe } from '../../../libs/core/src';
import {
  NatsConfigNameEnum,
  NatsInitHelper,
  NatsLoggingInterceptor,
  NatsQueueEnum,
  RpcToHttpExceptionFilter,
} from '../../../libs/microservice/src';
import { ServiceAdminAccountModule } from './service-admin-account.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceAdminAccountModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.useGlobalInterceptors(new NatsLoggingInterceptor());

  const config = configService.get(NatsConfigNameEnum.SERVICE_ADMIN_ACCOUNT);
  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Admin Account Service')
    .setDescription('Admin Account Service API')
    .setVersion(process.env.npm_package_version)
    .setDefaultContentType('application/json')
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

  await NatsInitHelper.init(app, config, NatsQueueEnum.ADMIN_QUEUE);

  await app.listen(config.port);
}
bootstrap();
