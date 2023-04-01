import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from '@nestjs/microservices';
import { NatsCustomClient } from '../client/nats.custom-client';

@Injectable()
export class NatsConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createClientOptions(): ClientProvider | Promise<ClientProvider> {
    const config = this.configService.get('api-usin');
    const thisApiName = config.name;
    const microserviceUrl = config.microservice.url;
    const microserviceTimeout = config.microservice.timeout;
    const version = process.env.npm_package_version;

    return {
      customClass: NatsCustomClient,

      options: {
        servers: [microserviceUrl],
        headers: {
          'api-version': `${version}`,
          'api-from': `${thisApiName}`,
        },
        queue: 'users_queue',
        timeout: microserviceTimeout,
        reconnect: true,
      },
    };
  }
}
