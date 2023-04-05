import { AuthChannelEnum } from './auth.channel.enum';
import { NatsConfigNameEnum } from './nats.config-name.enum';
import { UserChannelEnum } from './user.channel.enum';

export const natsEnum = {
  auth: {
    configName: NatsConfigNameEnum.SERVICE_AUTH,
    channel: AuthChannelEnum,
  },
  user: {
    configName: NatsConfigNameEnum.SERVICE_USER,
    channel: UserChannelEnum,
  },
};
