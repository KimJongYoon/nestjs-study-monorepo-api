import { BadRequestException, Logger } from '@nestjs/common';
import { CommonPostValidator } from '../validator/common.post.validator';

export class PostValidatorException {
  static validatePostId(postId: string) {
    const message = `post: ${postId} is not exist`;
    Logger.error(message, CommonPostValidator.name);
    throw new BadRequestException(message);
  }
}
