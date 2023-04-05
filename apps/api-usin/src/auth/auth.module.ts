import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { NatsConfigService } from '../../../../libs/microservice/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsinLoginGuard } from './guard/usin-login.guard';
import { UsinLoginStrategy } from './strategy/usin-login.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_CLIENT',
        imports: [ConfigModule],
        useClass: NatsConfigService,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsinLoginGuard, UsinLoginStrategy],
})
export class AuthModule {}
