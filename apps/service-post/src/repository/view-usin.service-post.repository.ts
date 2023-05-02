import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../libs/database/src';
import {
  Prisma,
  ViewUsinPost,
} from '../../../../libs/database/src/usin/generated/client';
import { FindAllViewUsinPostDto } from '../dto/find-all.view-usin-post.dto';
import { FindOneViewAdminPostDto } from '../dto/find-one.view-admin-post.dto';

@Injectable()
export class ViewUsinServicePostRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 포스트 목록 조회
   * @param dto
   */
  async findAll(
    dto: FindAllViewUsinPostDto,
  ): Promise<[ViewUsinPost[], number]> {
    const where: Prisma.ViewUsinPostWhereInput = {};
    const whereOR: Prisma.ViewUsinPostWhereInput[] = [];

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

    const orderBy: Prisma.Enumerable<Prisma.ViewUsinPostOrderByWithRelationInput> =
      {};
    if (dto.orderBy) {
      orderBy[`${dto.orderBy}`] = dto.orderByDirection;
    }

    const datas = await this.usinDatabaseService.viewUsinPost.findMany({
      where: where,
      orderBy: orderBy,
      skip: dto.page * dto.size,
      take: dto.size,
    });

    const count = await this.usinDatabaseService.viewUsinPost.count({
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
