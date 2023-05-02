import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {
  NatsConfigNameEnum,
  NatsConfigService,
  NatsQueueEnum,
} from '../../../../libs/microservice/src';
import { UsinPostController } from './usin-post.controller';
import { UsinPostService } from './usin-post.service';

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
            useValue: NatsConfigNameEnum.API_USIN,
          },
          {
            provide: 'queue',
            useValue: NatsQueueEnum.POST_QUEUE,
          },
        ],
      },
    ]),
  ],
  controllers: [UsinPostController],
  providers: [UsinPostService],
})
export class UsinPostModule {}
