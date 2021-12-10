import { NestFactory } from '@nestjs/core';
import { AdminApiModule } from './admin-api.module';
import configuration from './config/env.configuration';
import { swagger_document } from './config/swagger.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('study-api main.ts');
  const app = await NestFactory.create(AdminApiModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  swagger_document(
    new DocumentBuilder()
      .setTitle('Admin-api')
      .setDescription('The Admin API description')
      .setVersion('1.0')
      .addTag('admin-api')
      .build(),
    app,
  );
  logger.debug(`admin-api port:${configuration().port}`);
  await app.listen(configuration().port);
}
bootstrap();
