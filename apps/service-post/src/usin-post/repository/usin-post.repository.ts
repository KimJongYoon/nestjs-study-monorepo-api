import { Injectable } from '@nestjs/common';
import { UsinDatabaseService } from '../../../../../libs/database/src/usin';

@Injectable()
export class UsinPostRepository {
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
}
