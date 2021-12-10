import { NestFactory } from '@nestjs/core';
import { SessionApiModule } from './session-api.module';

async function bootstrap() {
  const app = await NestFactory.create(SessionApiModule);
  await app.listen(3000);
}
bootstrap();
