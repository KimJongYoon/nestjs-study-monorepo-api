import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';

@Injectable()
export class ServiceAdminAccountRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 관리자 계정 정보 조회 by nickName
   * @param nickName
   */
  async findOneByNickName(nickName: string) {
    const data = await this.usinDatabaseService.adminAccount.findFirst({
      where: {
        nickName: nickName,
      },
    });

    return data;
  }

  /**
   * 관리자 계정 정보 조회 by email
   * @param email
   */
  async findOneByEmail(email: string) {
    const data = await this.usinDatabaseService.adminAccount.findUnique({
      where: {
        email: email,
      },
    });

    return data;
  }

  /**
   * 관리자 계정 정보 등록
   * @param entity
   */
  async create(entity: Prisma.AdminAccountCreateInput) {
    const data = await this.usinDatabaseService.adminAccount.create({
      data: entity,
    });

    return data;
  }

  /**
   * 관리자 계정 정보 수정
   * @param entity
   */
  async edit(entity: Prisma.AdminAccountUpdateInput, email: string) {
    const data = await this.usinDatabaseService.adminAccount.update({
      where: {
        email: email,
      },
      data: entity,
    });

    return data;
  }
}
