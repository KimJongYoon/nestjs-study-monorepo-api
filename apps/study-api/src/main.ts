import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger_document } from './config/swagger.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('study-api main.ts');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('STUDY_PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  swagger_document(
    new DocumentBuilder()
      .setTitle('Study-api')
      .setDescription('The Study API description')
      .setVersion('1.0')
      .addTag('study-api')
      .build(),
    app,
  );
  logger.debug(`study-api port:${port}`);
  await app.listen(port);
}
bootstrap();
