import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceFishinggramService {
  getHello(): string {
    return 'Hello World!';
  }
}
