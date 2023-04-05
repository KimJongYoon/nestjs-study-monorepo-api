import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { GlobalValidationPipe } from '../../../libs/core/src';
import { NatsLoggingInterceptor } from '../../../libs/microservice/src';
import { RpcToHttpExceptionFilter } from '../../../libs/microservice/src/filter/rpc-to-http.exception.filter';
import { ServiceUserModule } from './service-user.module';
import { NatsInitHelper } from '../../../libs/microservice/src/helper/nats.init.helper';

async function bootstrap() {
  const app = await NestFactory.create(ServiceUserModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.useGlobalInterceptors(new NatsLoggingInterceptor());

  const config = configService.get('user');
  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service API')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
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

  await NatsInitHelper.init(app, config, 'users_queue');

  await app.listen(config.port);
}

bootstrap();
