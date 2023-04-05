import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../libs/database/src';
import {
  Prisma,
  ViewUsinUser,
} from '../../../libs/database/src/usin/generated/client';

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
   * [어신] 사용자 조회
   * @param uid
   * @returns
   */
  async findOneByUid(uid: string): Promise<Partial<ViewUsinUser>> {
    const data = await this.usinDatabaseService.viewUsinUser.findUnique({
      select: {
        uid: true,
        nickName: true,
        email: true,
        createdAt: true,
        remark: true,
      },
      where: {
        uid,
      },
    });

    return data;
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
