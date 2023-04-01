import { registerAs } from '@nestjs/config';

export default registerAs('api-usin', () => ({
  name: process.env.NAME,
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
    timeout: process.env.MICROSERVICE_TIMEOUT,
  },
}));
