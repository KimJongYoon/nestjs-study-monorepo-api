import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
}));
