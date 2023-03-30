import { Injectable } from '@nestjs/common';
import {
  Prisma,
  UsinDatabaseService,
  ViewUsinUser,
} from '../../../libs/database/src';

@Injectable()
export class ServiceUserRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * [어신] 사용자 목록 조회
   * @returns
   */
  async findAllUsin(): Promise<[ViewUsinUser[], number]> {
    const datas = await this.usinDatabaseService.viewUsinUser.findMany();
    const count = await this.usinDatabaseService.viewUsinUser.count();

    return [datas, count];
  }
  /**
   * 사용자 등록
   * @param entity
   * @returns
   */
  async create(entity: Prisma.UserCreateInput) {
    const data = await this.usinDatabaseService.user.create({
      data: {
        ...entity,
      },
    });

    return data;
  }
}
