import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/src/common.module';
import { RolesModule } from './roles/roles.module';
import { AdminApiModule } from './admin/admin-api.module';
import { configModule } from '../../common/config.module';
import { mikroormModule } from './config/mikroorm.module';

@Module({
  imports: [
    configModule,
    mikroormModule,
    CommonModule,
    RolesModule,
    AdminApiModule,
  ],
})
export class MainModule {}
