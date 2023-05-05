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
import { AdminAccountModule } from './admin-account/admin-account.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminPostModule } from './admin-post/admin-post.module';
import { ApiAdminModule } from './api-admin.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiAdminModule);

  const configService = app.get(ConfigService);
  const config = configService.get(NatsConfigNameEnum.API_ADMIN);

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
    .setTitle('Admin API')
    .setDescription('Admin API')
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
    include: [AdminAuthModule, AdminAccountModule, AdminPostModule],
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
