import { forwardRef, Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { AdminLoginStrategy } from './admin-login.strategy';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from '../../../admin-api/src/admin/entities/admin.entity';
import { Role } from '../../../admin-api/src/roles/entities/role.entity';
import { AdminApiService } from '../../../admin-api/src/admin/admin-api.service';
import { RolesService } from '../../../admin-api/src/roles/roles.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Admin, Role] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    AdminLoginStrategy,
    JwtStrategy,
    AdminApiService,
    RolesService,
  ],
})
export class SessionsModule {}
