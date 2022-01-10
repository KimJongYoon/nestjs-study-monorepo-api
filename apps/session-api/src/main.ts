import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';
import { ConfigService } from '@nestjs/config';
import { swagger_document } from '../../session-api/src/config/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const logger = new Logger('session-api main.ts');
  const configService = app.get(ConfigService);
  const port = configService.get('SESSION_PORT');

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
  logger.debug(`session-api port:${port}`);

  await app.listen(port);
}
bootstrap();
