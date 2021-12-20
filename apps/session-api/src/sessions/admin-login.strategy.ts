import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SessionsService } from './sessions.service';

@Injectable()
export class AdminLoginStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private sessionsService: SessionsService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    const admin = await this.sessionsService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
