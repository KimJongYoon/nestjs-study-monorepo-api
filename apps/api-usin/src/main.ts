import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  GlobalValidationPipe,
  LoggingInterceptor,
} from '../../../libs/core/src';
import { ApiExceptionsFilter } from '../../../libs/core/src/filter/api-exception.filter';
import { NatsConfigNameEnum } from '../../../libs/microservice/src';
import { ApiUsinModule } from './api-usin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiUsinModule);
  const configService = app.get(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  app.useGlobalFilters(new ApiExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = configService.get(NatsConfigNameEnum.API_USIN);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('API Usin')
    .setDescription('Usin API')
    .setVersion('1.0')
    // .addBearerAuth(
    //   {
    //     description: `Bearer 포멧의 토큰을 입력<JWT>`,
    //     name: 'Authorization',
    //     bearerFormat: 'Bearer',
    //     scheme: 'Bearer',
    //     type: 'http',
    //     in: 'Header',
    //   },
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [AuthModule, UserModule],
  });
  SwaggerModule.setup('api', app, document);

  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  await app.listen(config.port);
}
bootstrap();
