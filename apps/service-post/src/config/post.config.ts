import { registerAs } from '@nestjs/config';
import { NatsConfigNameEnum } from '../../../../libs/microservice/src';

export default registerAs(NatsConfigNameEnum.SERVICE_POST, () => ({
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
  cache: {
    host: process.env.CACHE_HOST ?? 'localhost',
    port: process.env.CACHE_PORT ?? 6379,
    ttl: process.env.CACHE_TTL ?? 1000,
  },
}));
