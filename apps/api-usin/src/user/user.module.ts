import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [configService.get('api-usin').microservice.user],
            headers: {
              'api-version': `${process.env.npm_package_version}`,
              'api-from': `${configService.get('api-usin').name}`,
            },
            queue: 'users_queue',
          },
        }),
      inject: [ConfigService],
    },

    UserService,
  ],
})
export class UserModule {}
