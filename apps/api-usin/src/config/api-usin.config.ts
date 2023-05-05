import { registerAs } from '@nestjs/config';
import { NatsConfigNameEnum } from '../../../../libs/microservice/src';

export default registerAs(NatsConfigNameEnum.API_USIN, () => ({
  name: process.env.NAME,
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
    timeout: process.env.MICROSERVICE_TIMEOUT,
  },
  cache: {
    host: process.env.CACHE_HOST ?? 'localhost',
    port: process.env.CACHE_PORT ?? 6379,
    ttl: process.env.CACHE_TTL ?? 1000,
  },
  cors: {
    domain: process.env.CORS_DOMAIN ?? '*',
    methods: process.env.CORS_METHODS ?? '*',
  },
}));
