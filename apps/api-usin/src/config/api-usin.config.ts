import { registerAs } from '@nestjs/config';

export default registerAs('api-usin', () => ({
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
}));
