import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';
import { AdminApiModule } from '../admin/admin-api.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Role]),
    forwardRef(() => AdminApiModule),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
