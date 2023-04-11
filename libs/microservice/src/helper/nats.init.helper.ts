import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class NatsInitHelper {
  /**
   * 마이크로서비스 실행
   * @param app
   * @param config
   * @param queue
   */
  static async init(app: INestApplication, config: any, queue: string) {
    await app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.NATS,
        options: {
          servers: [config.microservice.url],
          queue: queue,
        },
      },
      {
        inheritAppConfig: true,
      },
    );
    await app.startAllMicroservices();
  }
}
