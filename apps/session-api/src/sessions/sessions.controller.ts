import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user.decorator';
import { Admin } from '../../../admin-api/src/admin/entities/admin.entity';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminAuthLoginGuard } from './admin-auth-login-guard.service';

@ApiTags('세션 관리')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/admin/login')
  @UseGuards(AdminAuthLoginGuard)
  async loginAdmin(@User() admin: Admin, @Body() adminLoginDto: AdminLoginDto) {
    return await this.sessionsService.loginAdmin(admin);
  }
}
