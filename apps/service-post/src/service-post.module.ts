import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsinDatabaseModule } from '../../../libs/database/src';
import usinDatabaseConfig from '../../../libs/database/src/usin/usin.database.config';
import postConfig from './config/post.config';
import { ServicePostRepository } from './repository/service-post.repository';
import { ViewAdminServicePostRepository } from './repository/view-admin.service-post.repository';
import { ViewUsinServicePostRepository } from './repository/view-usin.service-post.repository';
import { ServicePostController } from './service-post.controller';
import { ServicePostListener } from './service-post.listener';
import { ServicePostService } from './service-post.service';
import { CommonPostValidator } from './validator/common.post.validator';
import { EditPostValidator } from './validator/edit.post.validator';
import { RemovePostValidator } from './validator/remove.post.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/service-post/.env',
      load: [postConfig, usinDatabaseConfig],
    }),

    EventEmitterModule.forRoot(),

    UsinDatabaseModule,
  ],
  controllers: [ServicePostController],
  providers: [
    ServicePostService,

    ServicePostListener,

    ServicePostRepository,
    ViewAdminServicePostRepository,
    ViewUsinServicePostRepository,

    CommonPostValidator,
    EditPostValidator,
    RemovePostValidator,
  ],
})
export class ServicePostModule {}
