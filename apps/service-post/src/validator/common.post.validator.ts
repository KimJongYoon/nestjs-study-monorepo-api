import { Injectable } from '@nestjs/common';
import { PostValidatorException } from '../exception/post.validator-exception';
import { ServicePostRepository } from '../repository/service-post.repository';

@Injectable()
export class CommonPostValidator {
  constructor(private readonly servicePostRepository: ServicePostRepository) {}

  /**
   * Post Id 유효성 검사
   * @param postId
   */
  async validatePostId(postId: string): Promise<void> {
    const post = await this.servicePostRepository.findOneByPostId(postId);

    const isNotExist = !post;
    if (isNotExist) {
      PostValidatorException.validatePostId(postId);
    }
  }
}
