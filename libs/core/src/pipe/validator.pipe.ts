import { ValidationPipeOptions } from '@nestjs/common';

export const GlobalValidationPipe: ValidationPipeOptions = {
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  whitelist: true,
};
