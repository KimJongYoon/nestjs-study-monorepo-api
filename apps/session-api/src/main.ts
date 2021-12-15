import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder } from '@nestjs/swagger';
import configuration from './config/env.configuration';
import { swagger_document } from './config/swagger.module';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const logger = new Logger('session-api main.ts');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  swagger_document(
    new DocumentBuilder()
      .setTitle('Session-api')
      .setDescription('The Session API description')
      .setVersion('1.0')
      .addTag('session-api')
      .build(),
    app,
  );
  logger.debug(`session-api port:${configuration().port}`);

  await app.listen(configuration().port);
}
bootstrap();
