import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { EditPostDto } from '../dto/edit.post.dto';
import { CommonPostValidator } from './common.post.validator';

@Injectable()
export class EditPostValidator implements EntityValidator<EditPostDto> {
  constructor(private readonly commonPostValidator: CommonPostValidator) {}

  async validate(dto: EditPostDto, optional?: object): Promise<void> {
    // Post Id 유효성 검사
    await this.commonPostValidator.validatePostId(dto.id);
  }
}
