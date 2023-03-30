import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
}));
