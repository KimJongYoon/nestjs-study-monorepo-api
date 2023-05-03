import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';

@Injectable()
export class ServicePostRepository {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  /**
   * 포스트 상세 조회
   * @param postId
   * @returns
   */
  async findOneByPostId(postId: string) {
    const data = await this.usinDatabaseService.post.findUnique({
      where: {
        id: postId,
      },
    });

    return data;
  }
  /**
   * 포스트 등록
   * @param entity
   * @returns
   */
  async create(entity: Prisma.PostUncheckedCreateInput) {
    const data = await this.usinDatabaseService.post.create({
      data: entity,
    });

    return data;
  }

  /**
   * 포스트 수정
   * @param entity
   * @param postId
   * @returns
   */
  async edit(entity: Prisma.PostUpdateInput, postId: string) {
    const data = await this.usinDatabaseService.post.update({
      where: {
        id: postId,
      },
      data: entity,
    });

    return data;
  }

  /**
   * 조회 수 증가
   * @param postId
   * @returns
   */
  async increaseReadCount(postId: string) {
    const data = await this.usinDatabaseService.post.update({
      where: {
        id: postId,
      },
      data: {
        readCount: {
          increment: 1,
        },
      },
    });

    return data;
  }
  /**
   * 포스트 삭제
   * @param entity
   * @param postId
   * @returns
   */
  async remove(entity: Prisma.PostUpdateInput, postId: string) {
    const data = await this.usinDatabaseService.post.update({
      where: {
        id: postId,
      },
      data: entity,
    });

    return data;
  }
}
