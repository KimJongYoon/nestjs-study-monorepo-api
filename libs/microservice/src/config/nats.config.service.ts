import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from '@nestjs/microservices';
import { NatsCustomClient } from '../client/nats.custom-client';
import { NatsHeaderEnum } from '../enum/nats.header.enum';

@Injectable()
export class NatsConfigService implements ClientsModuleOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    @Inject('configName') private readonly configName: string,
    @Inject('queue') private readonly queue: string,
  ) {}
  createClientOptions(): ClientProvider | Promise<ClientProvider> {
    const config = this.configService.get(this.configName);
    const thisApiName = config.name;
    const microserviceUrl = config.microservice.url;
    const microserviceTimeout = config.microservice.timeout;
    const version = process.env.npm_package_version;

    return {
      customClass: NatsCustomClient,

      options: {
        servers: [microserviceUrl],
        headers: {
          [NatsHeaderEnum.VERSION_SERVER]: `${version}`,
          [NatsHeaderEnum.FROM_SERVER]: `${thisApiName}`,
        },
        queue: this.queue,
        timeout: microserviceTimeout,
        reconnect: true,
      },
    };
  }
}
