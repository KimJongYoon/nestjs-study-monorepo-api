import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger_document = (config, app) => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
