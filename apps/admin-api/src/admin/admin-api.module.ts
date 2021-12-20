import { forwardRef, Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from './entities/admin.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/entities/role.entity';
import { JwtStrategy } from '../../../session-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Admin, Role] }),
    forwardRef(() => RolesModule),
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService, JwtStrategy],
  exports: [AdminApiService],
})
export class AdminApiModule {}
