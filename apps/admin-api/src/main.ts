import { NestFactory, Reflector } from '@nestjs/core';
import { swagger_document } from './config/swagger.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MainModule } from './main.module';
import { JwtAuthGuard } from '../../session-api/src/jwt/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('study-api main.ts');
  const app = await NestFactory.create(MainModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get('ADMIN_PORT');

  // pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // guard
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // swagger
  swagger_document(
    new DocumentBuilder()
      .setTitle('Admin-api')
      .setDescription('The Admin API description')
      .setVersion('1.0')
      .addTag('admin-api')
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
      .build(),
    app,
  );
  logger.debug(`admin-api port:${port}`);
  await app.listen(port);
}
bootstrap();
