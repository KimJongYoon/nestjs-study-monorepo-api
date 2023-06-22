import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../../libs/database/src';
import {
  Prisma,
  ViewAdminPost,
} from '../../../../../libs/database/src/usin/generated/client';
import { FindAllViewAdminPostDto } from '../dto/find-all.view-admin-post.dto';
import { FindOneViewAdminPostDto } from '../dto/find-one.view-admin-post.dto';

@Injectable()
export class ViewAdminPostRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 포스트 목록 조회
   * @param dto
   */
  async findAll(
    dto: FindAllViewAdminPostDto,
  ): Promise<[ViewAdminPost[], number]> {
    const where: Prisma.ViewAdminPostWhereInput = {};
    const whereOR: Prisma.ViewAdminPostWhereInput[] = [];

    if (dto.searchKeyword) {
      whereOR.push({
        title: {
          contains: dto.searchKeyword,
        },
      });
      whereOR.push({
        content: {
          contains: dto.searchKeyword,
        },
      });
    }

    if (whereOR.length > 0) {
      where.OR = whereOR;
    }
    const datas = await this.usinDatabaseService.viewAdminPost.findMany({
      where: where,
      skip: dto.page * dto.size,
      take: dto.size,
    });

    const count = await this.usinDatabaseService.viewAdminPost.count({
      where: where,
    });

    return [datas, count];
  }

  /**
   * 포스트 상세 조회
   * @param dto
   */
  async findOneOrThrow(dto: FindOneViewAdminPostDto) {
    const data = await this.usinDatabaseService.viewAdminPost.findUniqueOrThrow(
      {
        where: {
          id: dto.postId,
        },
      },
    );

    return data;
  }
}
