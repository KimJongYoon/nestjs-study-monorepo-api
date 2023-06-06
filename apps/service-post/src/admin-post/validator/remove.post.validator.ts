import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../../libs/core/src';
import { RemovePostDto } from '../dto/remove.post.dto';
import { CommonPostValidator } from './common.post.validator';

@Injectable()
export class RemovePostValidator implements EntityValidator<RemovePostDto> {
  constructor(private readonly commonPostValidator: CommonPostValidator) {}

  async validate(dto: RemovePostDto, optional?: object): Promise<void> {
    // Post Id 유효성 검사
    await this.commonPostValidator.validatePostId(dto.id);
  }
}
