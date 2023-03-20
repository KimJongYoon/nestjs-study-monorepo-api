import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../libs/database/src';

@Injectable()
export class ServiceUserService {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
