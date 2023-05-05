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
import { UsinAuthModule } from './usin-auth/usin-auth.module';
import { UsinPostModule } from './usin-post/usin-post.module';
import { UsinUserModule } from './usin-user/usin-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiUsinModule);

  const configService = app.get(ConfigService);
  const config = configService.get(NatsConfigNameEnum.API_USIN);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  app.enableCors({
    origin: config.cors.domain,
    methods: config.cors.methods,
  });
  app.useGlobalFilters(new ApiExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Usin API')
    .setDescription('Usin API')
    .setVersion(process.env.npm_package_version)
    .addBearerAuth(
      {
        description: `Bearer 포멧의 토큰을 입력<JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [UsinAuthModule, UsinUserModule, UsinPostModule],
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      tagsSorter: 'alpha',
      // operationsSorter: "alpha",
    },
  });

  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  await app.listen(config.port);
}
bootstrap();
