import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalValidationPipe } from '../../../libs/core/src';
import { ApiExceptionsFilter } from '../../../libs/core/src/filter/api-exception.filter';
import { LoggingInterceptor } from '../../../libs/core/src/interceptor/logging.interceptor';
import { ApiUsinModule } from './api-usin.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiUsinModule);
  const configService = app.get(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ApiExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = configService.get('api-usin');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('API Usin')
    .setDescription('Usin API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  Logger.log(`Listening on port ${config.port}`, 'Bootstrap');

  await app.listen(config.port);
}
bootstrap();
