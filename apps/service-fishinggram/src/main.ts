import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GlobalValidationPipe } from '../../../libs/core/src';
import { ServiceFishinggramModule } from './service-fishinggram.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceFishinggramModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipe));

  const port = configService.get('PORT');
  Logger.log(`Listening on port ${port}`, 'Bootstrap');
  await app.listen(port);
}
bootstrap();
