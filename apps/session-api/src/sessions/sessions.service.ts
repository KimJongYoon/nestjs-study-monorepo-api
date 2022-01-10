import { Injectable } from '@nestjs/common';
import { AdminApiService } from '../../../admin-api/src/admin/admin-api.service';
import { HasherHelper } from '../hasher.helper';
import { Admin } from '../../../admin-api/src/admin/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionsService {
  constructor(
    private readonly adminApiService: AdminApiService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginAdmin(admin: Admin) {
    // jwt 토큰 생성
    const payload = {
      email: admin.email,
      role: admin.role.role_code,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRES_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      }),
    };
  }

  async validateAdmin(email: string, password: string) {
    const savedAdmins = await this.adminApiService.find({ email: email });
    const savedAdmin = savedAdmins?.[0];
    const hashedPassword = await HasherHelper.hash(password);

    if (savedAdmin?.password === hashedPassword) {
      const { password, ...result } = savedAdmin;
      return result;
    }

    return null;
  }
}
