import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
