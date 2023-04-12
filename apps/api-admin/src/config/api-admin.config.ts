import { registerAs } from '@nestjs/config';
import { NatsConfigNameEnum } from '../../../../libs/microservice/src';

export default registerAs(NatsConfigNameEnum.API_ADMIN, () => ({
  name: process.env.NAME,
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
    timeout: process.env.MICROSERVICE_TIMEOUT,
  },
}));
