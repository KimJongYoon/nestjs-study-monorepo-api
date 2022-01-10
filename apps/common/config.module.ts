import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

const getEnvFilePath = (): string[] => {
  const envFilePaths = [];

  switch (process.env.NODE_ENV) {
    case 'dev':
      envFilePaths.push('.env.dev');
      break;
    case 'local':
      envFilePaths.push('.env.local');
      break;
  }
  return envFilePaths;
};

export const configModule = ConfigModule.forRoot({
  cache: true,
  envFilePath: getEnvFilePath(),
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'local').required(),
    PORT: Joi.number().default(3000),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
});
