import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { GlobalValidationPipe } from '../../../libs/core/src';
import { HttpToRpcExceptionFilter } from '../../../libs/microservice/src/filter/http-to-rpc.exception.filter';
import { ServiceUserModule } from './service-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceUserModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  const userConfig = configService.get('user');
  Logger.log(`Listening on port ${userConfig.port}`, 'Bootstrap');

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service API')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('dev', {
      url: `http://localhost:${userConfig.port}`,
      protocol: 'tcp',
    })
    .build();

  const asyncApiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup('api', app, asyncApiDocument);

  await startMicroService(app, userConfig);

  await app.listen(userConfig.port);
}

bootstrap();

/**
 * 마이크로 서비스 실행
 * @param app
 * @param userConfig
 */
async function startMicroService(app: INestApplication, userConfig: any) {
  await app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        // servers: [userConfig.microservice.url],
        servers: ['nats://localhost:4222'],
        queue: 'users_queue', // users_queue 라는 이름의 큐를 생성하여 여러 users 인스턴스가 메시지를 로드밸런싱 하도록 함(메시지가 1번 발생되면 1개의 인스턴스만 메시지를 받음)
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
}
