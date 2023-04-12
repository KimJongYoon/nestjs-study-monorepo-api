import { registerAs } from '@nestjs/config';
import { NatsConfigNameEnum } from '../../../../libs/microservice/src';

export default registerAs(NatsConfigNameEnum.SERVICE_ADMIN_ACCOUNT, () => ({
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
}));
