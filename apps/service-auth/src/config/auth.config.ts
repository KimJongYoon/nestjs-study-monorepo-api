import { registerAs } from '@nestjs/config';
import { NatsConfigNameEnum } from '../../../../libs/microservice/src';

export default registerAs(NatsConfigNameEnum.SERVICE_AUTH, () => ({
  name: process.env.NAME,
  port: process.env.PORT,
  microservice: {
    url: process.env.MICROSERVICE_URL,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
}));
