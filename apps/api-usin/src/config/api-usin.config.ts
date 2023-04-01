import { registerAs } from '@nestjs/config';

export default registerAs('api-usin', () => ({
  name: process.env.NAME,
  port: process.env.PORT,
  microservice: {
    user: process.env.MICROSERVICE_URL,
  },
}));
