import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../libs/database/src';

@Injectable()
export class ServiceUserRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  async create() {

  }
}
