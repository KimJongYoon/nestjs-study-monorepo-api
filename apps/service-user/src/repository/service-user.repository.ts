import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../libs/database/src';
import {
  Prisma,
  User,
} from '../../../../libs/database/src/usin/generated/client';

@Injectable()
export class ServiceUserRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 사용자 상세 정보 조회 by uid
   * @param uid
   * @returns
   */
  async findOneByUid(uid: string): Promise<Partial<User>> {
    const data = await this.usinDatabaseService.user.findUnique({
      where: {
        uid,
      },
    });

    return data;
  }

  /**
   * 사용자 상세 정보 조회 by nickName
   * @param nickName
   * @returns
   */
  async findOneByNickName(nickName: string): Promise<Partial<User>> {
    const data = await this.usinDatabaseService.user.findUnique({
      where: {
        uid: nickName,
      },
    });

    return data;
  }

  /**
   * 사용자 상세 정보 조회 by email
   * @param email
   * @returns
   */
  async findOneByEmail(email: string): Promise<Partial<User>> {
    const data = await this.usinDatabaseService.user.findUnique({
      where: {
        uid: email,
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

  /**
   * 사용자 정보 수정
   * @param entity
   * @param uid
   * @returns
   */
  async edit(entity: Prisma.UserUpdateInput, uid: string) {
    const data = await this.usinDatabaseService.user.update({
      where: {
        uid: uid,
      },
      data: {
        ...entity,
      },
    });

    return data;
  }
}
