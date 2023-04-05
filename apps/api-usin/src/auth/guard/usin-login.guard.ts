import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UsinLoginGuard extends AuthGuard('usin-login') {}
