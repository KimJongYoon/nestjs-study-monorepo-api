import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { AdminPostController } from './admin-post.controller';
import { AdminPostService } from './admin-post.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_POST_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
        extraProviders: [
          {
            provide: 'configName',
            useValue: NatsConfigNameEnum.API_ADMIN,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.POST_QUEUE,
          },
        ],
      },
    ]),
  ],
  controllers: [AdminPostController],
  providers: [AdminPostService],
})
export class AdminPostModule {}
