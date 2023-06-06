import { Injectable } from '@nestjs/common';
import { AdminPostValidatorException } from '../excepton/admin-post.validator-exception';
import { AdminPostRepository } from '../repository/admin-post.repository';

@Injectable()
export class CommonPostValidator {
  constructor(private readonly adminPostRepository: AdminPostRepository) {}

  /**
   * Post Id 유효성 검사
   * @param postId
   */
  async validatePostId(postId: string): Promise<void> {
    const post = await this.adminPostRepository.findOneByPostId(postId);

    const isNotExist = !post;
    if (isNotExist) {
      AdminPostValidatorException.validatePostId(postId);
    }
  }
}
